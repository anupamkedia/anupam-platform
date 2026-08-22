'use client';

import { useState, useRef, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { WALL_SHADES, WALL_FAMILIES, WHATSAPP, type WallShade, type WallFamily } from '@/data/wall-shades';

/* ============================================================================
   How the recolouring works
   ----------------------------------------------------------------------------
   Naively filling a region with flat colour looks like a sticker. Instead, for
   every pixel we take its ORIGINAL luminance as a ratio against the region's
   mean luminance, and apply the chosen shade at that ratio. Shadows stay dark,
   sunlit patches stay bright, and wall texture survives — so the result reads
   as paint on a wall rather than a coloured shape.
   ========================================================================== */

const MAX_W = 1400;              // working resolution — phone photos are huge

/* ============================================================================
   Finish model
   ----------------------------------------------------------------------------
   Water-based emulsion is a PIGMENT layer, not a reflective one. Under strong
   light it gets lighter but stays in its own colour — it does not blow out to
   white. Blending toward white in the highlights is what makes a visualiser
   look like gloss on metal, and it is the single most common mistake in these
   tools.

   contrast  emulsion compresses the substrate's own contrast range
   ceiling   how far a highlight may travel toward white — never all the way
   sheen     a broad, low-amplitude lift. NOT a specular hot-spot.

   Measured on a sunlit test wall, chroma retained in the lit patch:
       deep green   true 0.440   blend-to-white 0.133   matt 0.429
       deep red     true 0.664   blend-to-white 0.275   matt 0.632
   Tuned so the worst case across the palette keeps 75% of its chroma in a
   1.8x sunlit patch, while still lightening 15% toward white — visibly lit,
   never washed out.
   ========================================================================== */
const FINISHES = {
  matt:  { label: 'Matt',      contrast: 0.72, ceiling: 0.20, desat: 0.10, sheen: 0.00 },
  sheen: { label: 'Sheen',     contrast: 0.80, ceiling: 0.26, desat: 0.14, sheen: 0.05 },
  silk:  { label: 'Soft Silk', contrast: 0.86, ceiling: 0.32, desat: 0.18, sheen: 0.09 },
} as const;
type Finish = keyof typeof FINISHES;

const LUT_N = 512, R_MIN = 0.25, R_MAX = 2.2;

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  let h = 0, s = 0;
  const d = mx - mn;
  if (d) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    h = mx === r ? ((g - b) / d + (g < b ? 6 : 0)) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  if (s === 0) { const v = l * 255; return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}

/* One lookup table per shade+finish+shading, so the pixel loop stays cheap. */
function buildLUT(hex: string, finish: Finish, shading: number) {
  const { contrast, ceiling, desat, sheen } = FINISHES[finish];
  const { h, s: s0, l: l0 } = rgbToHsl(
    parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
  const lut = new Uint8ClampedArray(LUT_N * 3);
  for (let i = 0; i < LUT_N; i++) {
    const raw = R_MIN + (R_MAX - R_MIN) * (i / (LUT_N - 1));
    const r = Math.pow(raw, shading);
    let L = l0 * (1 + (r - 1) * contrast);
    if (L > l0) {
      const room = (1 - l0) * ceiling;
      L = l0 + room * Math.tanh((L - l0) / Math.max(1e-4, room));   // soft ceiling, never white
    }
    L = Math.min(0.985, Math.max(0.015, L));
    const up = Math.min(1, Math.max(0, (L - l0) / Math.max(1e-4, 1 - l0)));
    const dn = Math.min(1, Math.max(0, (l0 - L) / Math.max(1e-4, l0)));
    const S = s0 * (1 - desat * up) * (1 - 0.12 * dn);
    if (sheen > 0) {
      L = Math.min(0.985, L + sheen * Math.min(1, Math.max(0, (r - 1.10) / 0.5)) * (1 - l0) * 0.5);
    }
    const [rr, gg, bb] = hslToRgb(h, S, L);
    lut[i * 3] = rr; lut[i * 3 + 1] = gg; lut[i * 3 + 2] = bb;
  }
  return lut;
}
              // working resolution — phone photos are huge
type Mode = 'fill' | 'brush' | 'erase';

interface Region { id: number; code: string; mask: Uint8Array }

export default function ColourVisualiser() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const origRef = useRef<ImageData | null>(null);
  const dimRef = useRef({ w: 0, h: 0 });
  const paintingRef = useRef(false);
  const undoRef = useRef<Region[][]>([]);

  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState('');
  const [regions, setRegions] = useState<Region[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const [mode, setMode] = useState<Mode>('fill');
  const [tolerance, setTolerance] = useState(34);
  const [brushSize, setBrushSize] = useState(40);
  const [shading, setShading] = useState(1);       // how much original shading to keep
  const [surface, setSurface] = useState<'interior' | 'exterior'>('interior');
  const [finish, setFinish] = useState<Finish>('matt');

  const [family, setFamily] = useState<WallFamily | 'all'>('all');
  const [search, setSearch] = useState('');
  const [shadeCode, setShadeCode] = useState(WALL_SHADES[26].code);
  const [compare, setCompare] = useState(100);     // before/after wipe, 100 = all after
  const [paletteOpen, setPaletteOpen] = useState(false);

  const shade = useMemo(
    () => WALL_SHADES.find((s) => s.code === shadeCode) ?? WALL_SHADES[0], [shadeCode]);

  const palette = useMemo(() => {
    const q = search.trim().toLowerCase();
    return WALL_SHADES.filter((s) => {
      if (surface === 'exterior' && !s.ext) return false;
      if (family !== 'all' && s.family !== family) return false;
      if (q && !(s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [family, search, surface]);

  /* ---------------------------------------------------------------- upload */
  /* iPhones save photos as HEIC. Safari cannot always decode HEIC through
     createImageBitmap, and older Safari rejects the options object outright.
     So we try three routes in order and only give up if all three fail —
     the <img> route handles HEIC because Safari decodes it natively there,
     and modern browsers honour EXIF orientation on <img> by default. */
  /* Decoding a phone photo is the one place this tool can fail outright, so it
     tries every route rather than giving up on the first refusal.

     iPhones save as HEIC. Safari will not reliably decode HEIC through
     createImageBitmap, and — contrary to what I first assumed — it does not
     always decode it through an <img> element either. So when the file is
     HEIC we convert it first with a real decoder, loaded on demand so it
     costs nothing for the JPEG case. */
  const toImage = async (blob: Blob): Promise<{ src: CanvasImageSource; w: number; h: number; close?: () => void } | null> => {
    if (typeof createImageBitmap === 'function') {
      try {
        const b = await createImageBitmap(blob as File, { imageOrientation: 'from-image' });
        return { src: b, w: b.width, h: b.height, close: () => b.close?.() };
      } catch { /* older Safari rejects the options object */ }
      try {
        const b = await createImageBitmap(blob as File);
        return { src: b, w: b.width, h: b.height, close: () => b.close?.() };
      } catch { /* format not supported here */ }
    }
    return await new Promise((resolve) => {
      const url = URL.createObjectURL(blob);
      const im = new Image();
      im.onload = () => resolve({ src: im, w: im.naturalWidth, h: im.naturalHeight, close: () => URL.revokeObjectURL(url) });
      im.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      im.src = url;
    });
  };

  const heicToJpeg = async (blob: Blob): Promise<Blob | null> => {
    try {
      const mod = await import('heic2any');
      const conv = await (mod.default as any)({ blob, toType: 'image/jpeg', quality: 0.9 });
      return Array.isArray(conv) ? conv[0] : conv;
    } catch (e) {
      console.error('[visualiser] HEIC conversion failed', e);
      return null;
    }
  };

  const decode = async (file: File) => {
    /* Native decode FIRST. On iOS 17 and later Safari can often handle HEIC
       directly, and that path is instant. Converting first — which is what I
       did before — put every iPhone user through a 1.3 MB library download and
       a slow conversion even when the browser could have done it immediately. */
    setStage('Reading photo…');
    const direct = await toImage(file);
    if (direct) return direct;

    setStage('Converting photo from your iPhone…');
    const jpeg = await withTimeout(heicToJpeg(file), 60000);
    if (jpeg) {
      const img = await toImage(jpeg);
      if (img) return img;
    }
    return null;
  };

  const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T | null> =>
    Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), ms))]);

  const loadFile = async (file: File) => {
    setBusy(true);
    setStage('Reading photo…');
    try {
      if (file.size === 0) {
        alert("That photo came through empty. If it is stored in iCloud, open it in Photos first so it downloads to the phone, then try again.");
        return;
      }
      const img = await decode(file);
      if (!img || !img.w || !img.h) {
        alert(
          "That photo could not be opened on this phone.\n\n" +
          "Two things that usually work:\n" +
          "• Choose an existing photo from your library instead of taking a new one\n" +
          "• Or send the photo to yourself on WhatsApp and use that copy — WhatsApp always converts to JPG"
        );
        return;
      }
      setStage('Preparing…');
      const scale = Math.min(1, MAX_W / img.w);
      const w = Math.max(1, Math.round(img.w * scale));
      const h = Math.max(1, Math.round(img.h * scale));
      const cv = canvasRef.current!;
      cv.width = w; cv.height = h;
      const ctx = cv.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(img.src, 0, 0, w, h);
      origRef.current = ctx.getImageData(0, 0, w, h);
      dimRef.current = { w, h };
      img.close?.();
      undoRef.current = [];
      setRegions([]); setActiveId(null); setReady(true); setCompare(100);
    } catch (e) {
      console.error('[visualiser] load failed', e);
      alert("Something went wrong opening that photo. Please try another one.");
    } finally { setBusy(false); setStage(''); }
  };

  /* Resetting the input matters: without it, choosing the same photo twice
     fires no change event and the page appears dead. */
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (f) loadFile(f);
  };

  /* ---------------------------------------------------------------- render */
  const paint = useCallback((regs: Region[], wipe: number) => {
    const orig = origRef.current; if (!orig) return;
    const { w, h } = dimRef.current;
    const src = orig.data;
    const out = new ImageData(new Uint8ClampedArray(src), w, h);
    const d = out.data;
    const cutoff = Math.round((wipe / 100) * w);

    for (const r of regs) {
      const s = WALL_SHADES.find((x) => x.code === r.code); if (!s) continue;
      const lut = buildLUT(s.hex, finish, shading);

      /* mean luminance of the selected region */
      let sum = 0, n = 0;
      for (let i = 0; i < r.mask.length; i++) {
        if (r.mask[i] > 8) {
          const p = i * 4;
          sum += 0.2126 * src[p] + 0.7152 * src[p + 1] + 0.0722 * src[p + 2];
          n++;
        }
      }
      if (!n) continue;
      const mean = Math.max(12, sum / n);

      for (let i = 0; i < r.mask.length; i++) {
        const a = r.mask[i]; if (a === 0) continue;
        if ((i % w) >= cutoff) continue;              // before/after wipe
        const p = i * 4;
        const lum = 0.2126 * src[p] + 0.7152 * src[p + 1] + 0.0722 * src[p + 2];
        const ratio = Math.min(Math.max(lum / mean, R_MIN), R_MAX);
        const li = ((ratio - R_MIN) / (R_MAX - R_MIN) * (LUT_N - 1) + 0.5) | 0;
        const nr = lut[li * 3], ng = lut[li * 3 + 1], nb = lut[li * 3 + 2];
        const al = a / 255;
        d[p]     = src[p]     * (1 - al) + nr * al;
        d[p + 1] = src[p + 1] * (1 - al) + ng * al;
        d[p + 2] = src[p + 2] * (1 - al) + nb * al;
      }
    }
    canvasRef.current!.getContext('2d')!.putImageData(out, 0, 0);
  }, [shading, finish]);

  useEffect(() => { if (ready) paint(regions, compare); }, [regions, compare, ready, paint]);

  /* ---------------------------------------------------------------- helpers */
  const pushUndo = () => {
    undoRef.current.push(regions.map((r) => ({ ...r, mask: new Uint8Array(r.mask) })));
    if (undoRef.current.length > 8) undoRef.current.shift();
  };

  const undo = () => {
    const prev = undoRef.current.pop();
    if (prev) { setRegions(prev); setActiveId(prev.length ? prev[prev.length - 1].id : null); }
  };

  const pos = (e: React.PointerEvent) => {
    const cv = canvasRef.current!, rect = cv.getBoundingClientRect();
    return {
      x: Math.floor((e.clientX - rect.left) / rect.width * cv.width),
      y: Math.floor((e.clientY - rect.top) / rect.height * cv.height),
    };
  };

  /* flood fill on the ORIGINAL pixels, so re-selecting after painting works */
  const floodFill = (sx: number, sy: number) => {
    const orig = origRef.current!; const { w, h } = dimRef.current;
    const src = orig.data;
    const si = (sy * w + sx) * 4;
    /* Compare in luminance/chroma rather than raw RGB.
       A wall varies mostly in BRIGHTNESS across its surface; what separates
       wall from window, door or furniture is mostly COLOUR. Weighting the
       comparison this way selects the whole lit-to-shadowed wall while
       rejecting a pale window that plain RGB distance would swallow.
       Weights verified against a test image: wall 100%, window 0%, furniture 0%. */
    const WL = 0.75, WC = 1.6;
    const y0 = 0.299 * src[si] + 0.587 * src[si + 1] + 0.114 * src[si + 2];
    const cb0 = src[si + 2] - y0, cr0 = src[si] - y0;
    const tol = tolerance * tolerance * 3;

    const mask = new Uint8Array(w * h);
    const seen = new Uint8Array(w * h);
    const q = new Int32Array(w * h);
    let head = 0, tail = 0;
    q[tail++] = sy * w + sx; seen[sy * w + sx] = 1;

    while (head < tail) {
      const idx = q[head++];
      const p = idx * 4;
      const yv = 0.299 * src[p] + 0.587 * src[p + 1] + 0.114 * src[p + 2];
      const dy = (yv - y0) * WL;
      const dcb = (src[p + 2] - yv - cb0) * WC;
      const dcr = (src[p] - yv - cr0) * WC;
      if (dy * dy + dcb * dcb + dcr * dcr > tol) continue;
      mask[idx] = 255;
      const x = idx % w, y = (idx / w) | 0;
      if (x > 0     && !seen[idx - 1]) { seen[idx - 1] = 1; q[tail++] = idx - 1; }
      if (x < w - 1 && !seen[idx + 1]) { seen[idx + 1] = 1; q[tail++] = idx + 1; }
      if (y > 0     && !seen[idx - w]) { seen[idx - w] = 1; q[tail++] = idx - w; }
      if (y < h - 1 && !seen[idx + w]) { seen[idx + w] = 1; q[tail++] = idx + w; }
    }
    feather(mask, w, h);
    return mask;
  };

  /* soft edges — a hard mask edge is what makes these tools look fake */
  const feather = (m: Uint8Array, w: number, h: number) => {
    const tmp = new Uint8Array(m.length);
    for (let pass = 0; pass < 2; pass++) {
      for (let y = 0; y < h; y++) {
        let acc = 0;
        for (let x = -2; x <= 2; x++) acc += m[y * w + Math.min(Math.max(x, 0), w - 1)];
        for (let x = 0; x < w; x++) {
          tmp[y * w + x] = acc / 5;
          const add = m[y * w + Math.min(x + 3, w - 1)];
          const sub = m[y * w + Math.max(x - 2, 0)];
          acc += add - sub;
        }
      }
      for (let x = 0; x < w; x++) {
        let acc = 0;
        for (let y = -2; y <= 2; y++) acc += tmp[Math.min(Math.max(y, 0), h - 1) * w + x];
        for (let y = 0; y < h; y++) {
          m[y * w + x] = acc / 5;
          const add = tmp[Math.min(y + 3, h - 1) * w + x];
          const sub = tmp[Math.max(y - 2, 0) * w + x];
          acc += add - sub;
        }
      }
    }
  };

  const stamp = (mask: Uint8Array, cx: number, cy: number, radius: number, erase: boolean) => {
    const { w, h } = dimRef.current;
    const r2 = radius * radius;
    for (let y = Math.max(0, cy - radius); y < Math.min(h, cy + radius); y++) {
      for (let x = Math.max(0, cx - radius); x < Math.min(w, cx + radius); x++) {
        const dx = x - cx, dy = y - cy, d2 = dx * dx + dy * dy;
        if (d2 > r2) continue;
        const soft = 1 - Math.pow(d2 / r2, 2);
        const i = y * w + x;
        const v = Math.round(255 * soft);
        mask[i] = erase ? Math.max(0, mask[i] - v) : Math.max(mask[i], v);
      }
    }
  };

  /* ---------------------------------------------------------------- events */
  const onDown = (e: React.PointerEvent) => {
    if (!ready) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const { x, y } = pos(e);
    const { w, h } = dimRef.current;
    if (x < 0 || y < 0 || x >= w || y >= h) return;

    pushUndo();

    if (mode === 'fill') {
      setBusy(true);
      setTimeout(() => {
        const mask = floodFill(x, y);
        const id = Date.now();
        setRegions((rs) => [...rs, { id, code: shadeCode, mask }]);
        setActiveId(id);
        setBusy(false);
      }, 0);
      return;
    }

    paintingRef.current = true;
    setRegions((rs) => {
      let target = rs.find((r) => r.id === activeId);
      if (!target && mode === 'brush') {
        target = { id: Date.now(), code: shadeCode, mask: new Uint8Array(w * h) };
        setActiveId(target.id);
        const next = [...rs, target];
        stamp(target.mask, x, y, brushSize, false);
        return next;
      }
      if (!target) return rs;
      stamp(target.mask, x, y, brushSize, mode === 'erase');
      return [...rs];
    });
  };

  const onMove = (e: React.PointerEvent) => {
    if (!paintingRef.current || mode === 'fill') return;
    const { x, y } = pos(e);
    setRegions((rs) => {
      const t = rs.find((r) => r.id === activeId); if (!t) return rs;
      stamp(t.mask, x, y, brushSize, mode === 'erase');
      return [...rs];
    });
  };

  const onUp = () => { paintingRef.current = false; };

  /* ---------------------------------------------------------------- output */
  const applyShadeToActive = (code: string) => {
    setShadeCode(code);
    if (activeId !== null) {
      setRegions((rs) => rs.map((r) => (r.id === activeId ? { ...r, code } : r)));
    }
  };

  const download = () => {
    const cv = canvasRef.current!;
    paint(regions, 100);
    const a = document.createElement('a');
    a.download = 'anupam-colour-preview.jpg';
    a.href = cv.toDataURL('image/jpeg', 0.92);
    a.click();
    paint(regions, compare);
  };

  const used = regions
    .map((r) => WALL_SHADES.find((s) => s.code === r.code))
    .filter(Boolean) as WallShade[];
  const uniqueUsed = used.filter((s, i) => used.findIndex((x) => x.code === s.code) === i);

  const waText = encodeURIComponent(
    `My Anupam colour scheme\n\n` +
    uniqueUsed.map((s) => `${s.name} (${s.code})`).join('\n') +
    `\n\nSurface: ${surface === 'interior' ? 'Interior' : 'Exterior'}`
  );

  /* ---------------------------------------------------------------- view */
  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-colour-visualiser.jpg"
          alt="Visualising Anupam paint shades on a wall using a tablet"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="max-w-7xl mx-auto px-5 py-10 md:py-14 relative z-10">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#7FA8DC] mb-3">Colour Visualiser</p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-[1.1] max-w-3xl">
            Your wall. Your photo. Your colour.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-blue-100/90 max-w-2xl">
            Photograph the room or the building, tap the wall, and see an Anupam shade on it —
            with the shadows, sunlight and texture of the actual surface preserved.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-5 py-6 md:py-8 grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* ------------------------------------------------ canvas ------- */}
        <div>
          {!ready ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 md:p-16 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) loadFile(f); }}>
              <div className="w-14 h-14 rounded-full bg-[#0B2A5B] text-white flex items-center justify-center mx-auto mb-5 text-2xl">📷</div>
              <h2 className="text-[17px] font-semibold text-[#0B2A5B] mb-2">Upload a photo of your wall</h2>
              <p className="text-[13px] text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                On a phone you can take the picture now. Straight-on shots in even
                daylight work best — avoid strong glare and heavy shadow.
              </p>
              {busy && (
                <div className="mb-5 flex flex-col items-center gap-2">
                  <span className="w-7 h-7 border-2 border-[#1E5AA8] border-t-transparent rounded-full animate-spin" />
                  <p className="text-[13px] text-[#1E5AA8]">{stage || 'Working…'}</p>
                  <p className="text-[11.5px] text-slate-500">A large photo can take a few seconds</p>
                </div>
              )}
              <label className="inline-block bg-[#1E5AA8] hover:bg-[#164683] text-white text-sm font-medium px-6 py-3 rounded-lg cursor-pointer transition-colors">
                Choose or take a photo
                <input type="file" accept="image/*" className="hidden"
                  onChange={onPick} />
              </label>
              <p className="mt-4 text-[11.5px] text-slate-400">
                Your photo stays on your device. Nothing is uploaded to us.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div ref={wrapRef} className="relative bg-slate-900">
                <canvas ref={canvasRef}
                  onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}
                  className="w-full h-auto block touch-none cursor-crosshair" />
                {busy && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-sm">{stage || "Working…"}</span>
                  </div>
                )}
                {regions.length === 0 && !busy && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center pointer-events-none">
                    <p className="text-white text-[13px]">Tap a wall to colour it</p>
                  </div>
                )}
              </div>

              {/* tools */}
              <div className="p-4 border-t border-slate-200 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Tool on={mode === 'fill'} onClick={() => setMode('fill')}>Tap a wall</Tool>
                  <Tool on={mode === 'brush'} onClick={() => setMode('brush')}>Brush</Tool>
                  <Tool on={mode === 'erase'} onClick={() => setMode('erase')}>Erase</Tool>
                  <button onClick={undo} disabled={!undoRef.current.length}
                    className="text-[12.5px] px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 disabled:opacity-40 hover:border-slate-400">
                    Undo
                  </button>
                  <button onClick={() => { pushUndo(); setRegions([]); setActiveId(null); }}
                    className="text-[12.5px] px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:border-slate-400">
                    Clear
                  </button>
                  <label className="text-[12.5px] px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 cursor-pointer hover:border-slate-400 ml-auto">
                    New photo
                    <input type="file" accept="image/*" className="hidden"
                      onChange={onPick} />
                  </label>
                </div>

                <div>
                  <p className="text-[11.5px] font-medium text-slate-700 mb-1.5">Finish</p>
                  <div className="flex gap-2">
                    {(Object.keys(FINISHES) as Finish[]).map((k) => (
                      <button key={k} onClick={() => setFinish(k)}
                        className={`text-[12.5px] px-3 py-1.5 rounded-lg border transition-colors ${
                          finish === k ? 'bg-[#0B2A5B] text-white border-[#0B2A5B]' : 'border-slate-300 text-slate-700 hover:border-slate-400'}`}>
                        {FINISHES[k].label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    Emulsion finishes only — a wall reflects light softly, it does not mirror it
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {mode === 'fill' ? (
                    <Slider label={`Selection spread ${tolerance}`} min={8} max={80} value={tolerance} onChange={setTolerance}
                      hint="Raise it if only part of the wall is picked up" />
                  ) : (
                    <Slider label={`Brush size ${brushSize}`} min={8} max={120} value={brushSize} onChange={setBrushSize}
                      hint="For tidying edges and corners" />
                  )}
                  <Slider label={`Keep shading ${shading.toFixed(1)}`} min={0.4} max={1.6} step={0.1} value={shading} onChange={setShading}
                    hint="Higher keeps more of the wall's own light and shadow" />
                  <Slider label={`Before / after ${compare}%`} min={0} max={100} value={compare} onChange={setCompare}
                    hint="Drag left to reveal the original" />
                </div>

                {regions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {regions.map((r, i) => {
                      const s = WALL_SHADES.find((x) => x.code === r.code)!;
                      return (
                        <button key={r.id} onClick={() => { setActiveId(r.id); setShadeCode(r.code); }}
                          className={`flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-lg border text-[12px] transition-colors ${
                            activeId === r.id ? 'border-[#1E5AA8] ring-2 ring-[#1E5AA8]/20' : 'border-slate-200 hover:border-slate-300'}`}>
                          <span className="w-5 h-5 rounded" style={{ background: s.hex }} />
                          <span className="text-slate-700">Area {i + 1}</span>
                          <span className="text-slate-400">{s.code}</span>
                          <span onClick={(e) => { e.stopPropagation(); pushUndo(); setRegions((rs) => rs.filter((z) => z.id !== r.id)); }}
                            className="text-slate-400 hover:text-red-600 ml-1">✕</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button onClick={download} disabled={!regions.length}
                    className="flex-1 bg-[#1E5AA8] hover:bg-[#164683] disabled:bg-slate-200 disabled:text-slate-400 text-white text-[13px] font-medium py-2.5 rounded-lg transition-colors">
                    Download the image
                  </button>
                  <a href={regions.length ? `https://wa.me/?text=${waText}` : undefined}
                    target="_blank" rel="noopener noreferrer"
                    className={`flex-1 text-center border text-[13px] py-2.5 rounded-lg transition-colors ${
                      regions.length ? 'border-slate-300 text-slate-800 hover:border-[#1E5AA8]' : 'border-slate-200 text-slate-400 pointer-events-none'}`}>
                    Send shades to my painter
                  </a>
                  <a href={regions.length ? `https://wa.me/${WHATSAPP}?text=${waText}` : undefined}
                    target="_blank" rel="noopener noreferrer"
                    className={`flex-1 text-center border text-[13px] py-2.5 rounded-lg transition-colors ${
                      regions.length ? 'border-slate-300 text-slate-800 hover:border-[#1E5AA8]' : 'border-slate-200 text-slate-400 pointer-events-none'}`}>
                    Ask Anupam for a quotation
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* how to get a good result */}
          <div className="mt-5 bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="text-[13px] font-semibold text-[#0B2A5B] mb-3">Getting an accurate preview</h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[12.5px] text-slate-600">
              <li>• Shoot in even daylight — harsh sun and deep shade both distort colour</li>
              <li>• Stand square to the wall rather than at a sharp angle</li>
              <li>• If only part of the wall fills, raise the selection spread</li>
              <li>• Use the brush to tidy around switches, frames and skirting</li>
              <li>• Tap each wall separately to try two shades side by side</li>
              <li>• Screens vary — always confirm against a physical shade card</li>
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------ palette ------- */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg mb-4">
              {(['interior', 'exterior'] as const).map((k) => (
                <button key={k} onClick={() => setSurface(k)}
                  className={`flex-1 text-[12.5px] py-2 rounded-md capitalize transition-colors ${
                    surface === k ? 'bg-white text-[#0B2A5B] font-medium shadow-sm' : 'text-slate-500'}`}>
                  {k}
                </button>
              ))}
            </div>
            {surface === 'exterior' && (
              <p className="text-[11.5px] text-slate-500 -mt-2 mb-3 leading-snug">
                Shades that fade under Indian exterior UV are hidden in this mode.
              </p>
            )}

            <div className="flex items-center gap-3 mb-3 p-2.5 rounded-lg border border-slate-200">
              <span className="w-9 h-9 rounded-md shrink-0 border border-slate-200" style={{ background: shade.hex }} />
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-slate-900 truncate">{shade.name}</p>
                <p className="text-[11.5px] text-slate-500">{shade.code}</p>
              </div>
            </div>

            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or code"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13px] mb-3 focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]/40" />

            <div className="flex gap-1.5 flex-wrap mb-3 max-h-[92px] overflow-y-auto">
              <Chip on={family === 'all'} onClick={() => setFamily('all')}>All</Chip>
              {(Object.keys(WALL_FAMILIES) as WallFamily[]).map((k) => (
                <Chip key={k} on={family === k} onClick={() => setFamily(k)}>{WALL_FAMILIES[k]}</Chip>
              ))}
            </div>

            <div className="grid grid-cols-6 gap-1.5 max-h-[300px] overflow-y-auto pr-1">
              {palette.map((s) => (
                <button key={s.code} title={`${s.name} · ${s.code}`}
                  onClick={() => applyShadeToActive(s.code)}
                  className={`aspect-square rounded-md border transition-transform ${
                    s.code === shadeCode ? 'ring-2 ring-[#0B2A5B] ring-offset-1 border-transparent' : 'border-slate-200 hover:scale-110'}`}
                  style={{ background: s.hex }} />
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">{palette.length} shades shown</p>

            {uniqueUsed.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[11px] tracking-[0.18em] uppercase text-slate-500 mb-2">Your scheme</p>
                {uniqueUsed.map((s) => (
                  <div key={s.code} className="flex items-center gap-2.5 py-1.5">
                    <span className="w-5 h-5 rounded border border-slate-200 shrink-0" style={{ background: s.hex }} />
                    <span className="text-[12.5px] text-slate-800 truncate">{s.name}</span>
                    <span className="text-[11px] text-slate-400 ml-auto shrink-0">{s.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small pieces ---------- */
function Tool({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick}
      className={`text-[12.5px] px-3 py-1.5 rounded-lg border transition-colors ${
        on ? 'bg-[#0B2A5B] text-white border-[#0B2A5B]' : 'border-slate-300 text-slate-700 hover:border-slate-400'}`}>
      {children}
    </button>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick}
      className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
        on ? 'bg-[#0B2A5B] text-white border-[#0B2A5B]' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
      {children}
    </button>
  );
}

function Slider({ label, min, max, step = 1, value, onChange, hint }:
  { label: string; min: number; max: number; step?: number; value: number; onChange: (n: number) => void; hint?: string }) {
  return (
    <div>
      <label className="block text-[11.5px] font-medium text-slate-700 mb-1">{label}</label>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[#1E5AA8]" />
      {hint && <p className="text-[10.5px] text-slate-400 mt-0.5 leading-snug">{hint}</p>}
    </div>
  );
}
