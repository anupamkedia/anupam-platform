'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ChevronRight, Camera, Send, CheckCircle } from 'lucide-react';

const failures = [
  { id: 'rusting', name: 'Rusting / Corrosion', symptom: 'Red-brown rust spots, surface pitting, or widespread oxidation appearing through or under the coating film.', causes: ['Insufficient surface preparation — mill scale, rust or contaminants not removed before coating', 'Inadequate DFT — coating too thin to provide barrier protection', 'Wrong primer selection — non-inhibitive primer used in corrosive environment', 'Damage to coating exposing bare steel', 'Exceeded recoat interval between primer and topcoat'], confirm: 'Check DFT with gauge. Check adhesion with cross-cut test. Check if original surface prep met specification.', corrective: 'Remove all rust by blast cleaning to Sa 2.5. Apply full coating system — zinc-rich or inhibitive primer, intermediate, and topcoat to specified DFT.', prevent: 'Specify correct surface preparation standard. Use zinc-rich primer for C4-CX environments. Ensure DFT meets specification. Inspect recoat intervals.', products: ['Inorganic Zinc Silicate Primer', 'Epoxy Zinc Phosphate Primer', 'Epoxy MIO Intermediate', 'Aliphatic PU Topcoat'], solution: '/solutions/structural-steel' },
  { id: 'blistering', name: 'Blistering', symptom: 'Dome-shaped bubbles or blisters in the coating film, ranging from pinpoint to large areas. May contain liquid or be dry.', causes: ['Moisture trapped under coating — painting over damp surface or in high humidity', 'Solvent entrapment — overcoating before previous coat has cured', 'Osmotic blistering — in immersion service, water migrates through coating to soluble salts on steel', 'Contamination under coating — oil, grease, or salt not removed'], confirm: 'Cut open blister. If liquid inside, test for salts. Check if blistering is at steel interface or between coats.', corrective: 'Remove all blistered coating back to sound substrate. Clean thoroughly. Recoat with appropriate system ensuring surface is dry and clean.', prevent: 'Check dew point before application — surface must be 3°C above dew point. Test for salt contamination. Observe solvent flash-off times. Monitor humidity.', products: ['Solventless Epoxy Tank Lining', 'Epoxy High-Build Coating'], solution: '/solutions/tank-lining' },
  { id: 'peeling', name: 'Peeling / Flaking', symptom: 'Coating lifting and peeling away from the substrate or from the previous coat in sheets or flakes.', causes: ['Poor surface preparation — coating applied over loose or powdery surface', 'Incompatible coating layers — wrong system combination', 'Exceeded maximum recoat interval — poor inter-coat adhesion', 'Surface contamination — dust, grease, or moisture between coats', 'Painting over chalked or degraded existing coating without preparation'], confirm: 'Adhesion test (cross-cut or pull-off). Check at which interface the failure occurs — substrate or inter-coat.', corrective: 'Remove all loose and poorly adhered coating. Prepare surface to specification. Apply compatible system.', prevent: 'Follow recoat intervals strictly. Clean surface between coats. Use recommended primers for each substrate. Test adhesion before full application.', products: ['Azura Damp Arrestor Primer', 'Epoxy Primer'], solution: '/products/decorative' },
  { id: 'chalking', name: 'Chalking', symptom: 'Powdery white residue on the coating surface when touched. Colour appears faded and dull.', causes: ['UV degradation of the resin binder — common in exterior coatings', 'Inferior grade topcoat not designed for exterior UV exposure', 'Over-thinning of coating reducing binder concentration', 'Natural weathering beyond the coating design life'], confirm: 'Rub surface with dark cloth — white powder transfer confirms chalking. Measure remaining DFT.', corrective: 'If DFT is adequate, wash and apply fresh topcoat. If DFT is low, full system recoat required.', prevent: 'Use aliphatic PU or FEVE topcoat for long-term UV resistance. Ensure correct DFT. Do not over-thin.', products: ['Aliphatic PU Topcoat', 'FEVE Fluoropolymer Coating', 'Azura Weather Shield 15'], solution: '/products/industrial' },
  { id: 'cracking', name: 'Cracking', symptom: 'Visible cracks in the coating surface — from fine hairline cracks to deep splits exposing the substrate.', causes: ['Coating too rigid for substrate movement — thermal expansion/contraction', 'DFT too high in a single coat — stress cracking', 'Wrong coating flexibility for the application', 'Substrate cracking transmitting through the coating', 'Coating aged beyond its service life'], confirm: 'Examine crack pattern. Mud-cracking indicates excess DFT. Check if cracks reach substrate or are surface-only.', corrective: 'Remove cracked coating. Address substrate cracks if present. Apply flexible system suitable for expected movement.', prevent: 'Do not exceed maximum recommended DFT per coat. Use flexible coatings where substrate movement is expected. Select crack-bridging products for masonry.', products: ['Arest Elastomeric Waterproof Coating', 'Azura Weather Shield 15', 'Arest Crack Filler'], solution: '/solutions/real-estate' },
  { id: 'dampness', name: 'Dampness / Water Seepage', symptom: 'Wet patches, water stains, damp marks, or efflorescence (white salt deposits) on walls or ceilings.', causes: ['Water ingress from exterior — cracks in plaster, faulty waterproofing', 'Rising damp from ground level', 'Plumbing leaks within walls', 'Condensation due to temperature differentials', 'Painting over damp surface without damp-proofing primer'], confirm: 'Moisture meter test on wall. Check for external cracks. Trace water source.', corrective: 'Fix water source first. Allow wall to dry completely. Apply Arest Damp Block 2K system. Then repaint with damp arrestor primer and topcoat.', prevent: 'Use Azura Damp Arrestor Primer on all exterior and damp-prone walls. Apply Arest waterproofing on terraces and external walls. Ensure proper drainage.', products: ['Arest Damp Block 2K', 'Azura Damp Arrestor Primer', 'Arest Cool Roof Coating', 'Arest Crack Filler'], solution: '/products/decorative' },
  { id: 'fungal', name: 'Fungal / Algae Growth', symptom: 'Dark patches, green or black spots, mould growth on painted walls — especially in humid or shaded areas.', causes: ['High humidity and poor ventilation', 'Coating without anti-fungal properties used in damp environment', 'Organic matter or dirt accumulation providing nutrients', 'North-facing or shaded walls with persistent moisture'], confirm: 'Visual inspection. Wipe with diluted bleach — if marks disappear, it is biological growth not staining.', corrective: 'Clean surface with Azura Biowash. Allow to dry. Apply anti-fungal primer. Topcoat with fungal-resistant emulsion.', prevent: 'Use Azura or Asure range with built-in anti-fungal and anti-algal properties. Ensure ventilation. Apply Biowash before repainting exterior surfaces.', products: ['Azura Hi-Efficient Biowash', 'Azura Weather Shield 15', 'Asure Radiance Exterior'], solution: '/products/decorative' },
  { id: 'floor-delam', name: 'Floor Coating Delamination', symptom: 'Epoxy or PU floor coating lifting from concrete substrate in sheets. Often starts at edges or joints.', causes: ['Concrete moisture exceeding 4% — moisture vapour trapped under coating', 'Laitance or curing compound not removed from concrete', 'Contamination — oil, grease, or chemical on concrete surface', 'Insufficient surface preparation — no grinding or blasting', 'Coating applied below minimum temperature'], confirm: 'Pull-off adhesion test. Moisture test on concrete. Check if failure is at concrete interface or between coats.', corrective: 'Remove delaminated coating. Shot-blast or diamond-grind concrete. Test moisture. Apply moisture-tolerant primer if needed. Recoat with Duraflo system.', prevent: 'Always test concrete moisture before application. Diamond-grind or shot-blast to remove laitance. Use penetrating primer. Observe temperature and humidity limits.', products: ['Epoxy Self-Levelling Floor Coating', 'Polyaspartic Floor Coating', 'Epoxy Floor Primer'], solution: '/solutions/industrial-flooring' },
];

export default function CoatingFailuresPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', company: '', failure: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const active = failures.find(f => f.id === selected);

  const submitInspection = async () => {
    await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, enquiry_type: 'Coating Failure Inspection', message: `Failure: ${formData.failure} | ${formData.message}` }) });
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-16 md:py-24">
        <div className="container-wide max-w-3xl">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">What Went Wrong With Your Coating?</h1>
          <p className="text-white/50 leading-relaxed">Identify common coating failures, understand causes, and learn the correct remediation. Select the problem you are experiencing below.</p>
        </div>
      </section>

      <section className="section-padding" style={{background: 'var(--color-warm-white)'}}>
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {failures.map(f => (
              <button key={f.id} onClick={() => setSelected(f.id)}
                className={`card p-4 text-left transition ${selected === f.id ? 'border-[var(--color-red)] shadow-md' : 'hover:border-gray-300'}`}>
                <AlertTriangle size={16} className={selected === f.id ? 'text-[var(--color-red)]' : 'text-[var(--color-steel)]'} />
                <div className="text-sm font-semibold text-[var(--color-navy)] mt-2">{f.name}</div>
              </button>
            ))}
          </div>

          {active && (
            <div className="max-w-3xl mx-auto">
              <div className="w-10 h-[2px] bg-[var(--color-red)] mb-4" />
              <h2 className="text-section-heading mb-6">{active.name}</h2>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-red)] mb-2">What You Are Seeing</h3>
                  <p className="text-sm text-[var(--color-graphite)] leading-relaxed">{active.symptom}</p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)] mb-3">Likely Causes</h3>
                  <div className="space-y-2">{active.causes.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[var(--color-graphite)]"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] mt-1.5 shrink-0" />{c}</div>
                  ))}</div>
                </div>

                <div className="card p-6" style={{background:'#FEF7ED'}}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-decorative)] mb-2">How To Confirm</h3>
                  <p className="text-sm text-[var(--color-graphite)] leading-relaxed">{active.confirm}</p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)] mb-2">Corrective Action</h3>
                  <p className="text-sm text-[var(--color-graphite)] leading-relaxed">{active.corrective}</p>
                </div>

                <div className="card p-6" style={{background:'#EEF7EE'}}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-green-700 mb-2">How To Prevent Recurrence</h3>
                  <p className="text-sm text-[var(--color-graphite)] leading-relaxed">{active.prevent}</p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)] mb-3">Recommended Anupam Products</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {active.products.map(p => <span key={p} className="text-xs px-3 py-1.5 bg-gray-100 text-[var(--color-navy)] font-medium" style={{borderRadius:'var(--radius-sm)'}}>{p}</span>)}
                  </div>
                  <Link href={active.solution} className="text-sm font-semibold text-[var(--color-red)] inline-flex items-center gap-1 hover:gap-2 transition-all">View Related Solution <ChevronRight size={14} /></Link>
                </div>

                <div className="card p-6 bg-[var(--color-navy)] text-white">
                  <h3 className="font-semibold mb-2">Need Help With This Problem?</h3>
                  <p className="text-sm text-white/50 mb-4">Our technical team can review site photographs and recommend the correct remediation system.</p>
                  <div className="flex gap-3">
                    <button onClick={() => { setShowForm(true); setFormData({...formData, failure: active.name}); }} className="bg-[var(--color-red)] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Request Site Inspection</button>
                    <a href="tel:03322651204" className="border border-white/20 text-white text-sm font-semibold px-5 py-2.5 hover:bg-white/10 transition" style={{borderRadius:'var(--radius-md)'}}>Call Technical Team</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white max-w-md w-full p-6" style={{borderRadius:'var(--radius-lg)'}} onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-6"><CheckCircle className="mx-auto mb-3" size={48} style={{color:'var(--color-red)'}} /><h3 className="font-bold text-[var(--color-navy)]">Inspection Request Submitted</h3><p className="text-sm text-[var(--color-steel)] mt-2">Our technical team will contact you within 24 hours.</p></div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-bold text-[var(--color-navy)] mb-4">Request Site Inspection — {formData.failure}</h3>
                <input className="input-field" placeholder="Your Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input className="input-field" placeholder="Phone *" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <input className="input-field" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input className="input-field" placeholder="Company / Location" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                <textarea className="input-field" rows={3} placeholder="Describe the problem, location, and when it started..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                <button onClick={submitInspection} className="w-full bg-[var(--color-red)] text-white font-semibold py-3" style={{borderRadius:'var(--radius-md)'}}><Send size={16} className="inline mr-2" />Submit Request</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
