'use client';
import { useState, useEffect } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { getTurnstileToken } from '@/lib/turnstile';

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', requirement: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !show && !dismissed) {
        setShow(true);
      }
    };
    // Also trigger after 45 seconds on page
    const timer = setTimeout(() => {
      if (!show && !dismissed) setShow(true);
    }, 45000);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => { document.removeEventListener('mouseleave', handleMouseLeave); clearTimeout(timer); };
  }, [show, dismissed]);

  const handleSubmit = async () => {
    if (sending) return;
    setSending(true);
    try {
      const turnstileToken = await getTurnstileToken();
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          enquiry_type: 'Exit Intent Lead',
          message: form.requirement || 'Lead from exit popup',
          source: 'exit-popup',
          turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        /* Tell the visitor the truth. Showing "Thank You" on a rejected
           submission loses the very people who tried to reach us. */
        alert(data.error || 'Please check your name and mobile number, then try again.');
        return;
      }
      setSubmitted(true);
      setTimeout(() => { setShow(false); setDismissed(true); }, 3000);
    } catch {
      alert('We could not send that just now. Please call 033-22651204.');
    } finally {
      setSending(false);
    }
  };

  const close = () => { setShow(false); setDismissed(true); };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={close}>
      <div className="bg-white max-w-lg w-full overflow-hidden" style={{borderRadius:'var(--radius-lg)'}} onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="p-10 text-center">
            <CheckCircle className="mx-auto mb-4" size={56} style={{color:'var(--color-red)'}} />
            <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">Thank You!</h3>
            <p className="text-[var(--color-steel)]">Our team will contact you shortly.</p>
          </div>
        ) : (
          <>
            <div className="bg-[var(--color-navy)] p-8 text-white relative">
              <button onClick={close} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20} /></button>
              <h2 className="text-2xl font-bold mb-2">Wait — Before You Go!</h2>
              <p className="text-white/60 text-sm">Get a free technical consultation and competitive quote for your coating requirement.</p>
            </div>
            <div className="p-6 space-y-3">
              <input className="input-field" placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input className="input-field" placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <input className="input-field" placeholder="Email (optional)" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <select className="input-field" value={form.requirement} onChange={e => setForm({...form, requirement: e.target.value})}>
                <option value="">What do you need? (optional)</option>
                <option>Home Painting Quote</option>
                <option>Industrial Coating Quote</option>
                <option>Product Information</option>
                <option>Become a Dealer</option>
                <option>Technical Consultation</option>
                <option>Tender Support</option>
                <option>Other</option>
              </select>
              <button onClick={handleSubmit} disabled={!form.name || !form.phone}
                className="w-full bg-[var(--color-red)] text-white font-semibold py-3.5 hover:opacity-90 transition disabled:opacity-40 inline-flex items-center justify-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
                <Send size={16} /> Get Free Consultation
              </button>
              <p className="text-xs text-center text-[var(--color-steel)]">No spam. Our technical team will call you within 24 hours.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
