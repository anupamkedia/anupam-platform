'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, AlertCircle, Check, MessageSquare, Mail } from 'lucide-react';

/* ============================================================================
   PORTALS_LIVE
   ----------------------------------------------------------------------------
   false — visitors see the portal roll-out page and can register interest.
   true  — the real login form is shown instead.

   Flip this to true the day authentication actually works. Nothing else on
   this page needs to change; the login form below is untouched and ready.
   ========================================================================== */
const PORTALS_LIVE = false;

const WHATSAPP = '919831728605';
const EMAIL = 'care@anupampaints.com';

const PORTALS = [
  { name: 'Dealer Portal', who: 'For Anupam Paints stockists and distributors',
    what: ['Place and track orders', 'Statements and credit position', 'Scheme and margin details', 'Marketing material downloads'] },
  { name: 'Painter Portal', who: 'For applicators and contractors',
    what: ['Loyalty points and rewards', 'Product training modules', 'Application guides and videos', 'Warranty registration'] },
  { name: 'Customer Portal', who: 'For project and institutional buyers',
    what: ['Order and dispatch status', 'Test certificates by batch', 'Technical data sheets', 'Site support requests'] },
  { name: 'Employee Portal', who: 'For Anupam Paints staff',
    what: ['Daily reporting', 'Price and stock lookup', 'Customer and lead records', 'Internal documents'] },
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const [name, setName] = useState('');
  const [firm, setFirm] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Dealer Portal');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(true);
  };

  const enquiryText =
    `Portal access request\n\n` +
    `Portal: ${role}\n` +
    `Name: ${name}\n` +
    `Firm: ${firm}\n` +
    `Phone: ${phone}`;

  const ready = name.trim() !== '' && phone.trim() !== '';

  /* ---------------- live login ---------------- */
  if (PORTALS_LIVE) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-warm-white)] px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <img src="/img/logos/anupam-paints-logo.png" alt="Anupam Paints" className="h-12 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-[var(--color-navy)]">Portal Login</h1>
            <p className="text-sm text-[var(--color-steel)] mt-1">Sign in to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="card p-8 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 flex items-center gap-2" style={{ borderRadius: 'var(--radius-md)' }}>
                <AlertCircle size={16} className="shrink-0" />
                Invalid username or password. Please try again.
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Username / Mobile Number</label>
              <input className="input-field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Password</label>
              <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
            </div>
            <button type="submit" className="w-full bg-[var(--color-red)] text-white font-semibold py-3.5 hover:opacity-90 transition inline-flex items-center justify-center gap-2" style={{ borderRadius: 'var(--radius-md)' }}>
              <Lock size={16} /> Sign In
            </button>
            <p className="text-xs text-center text-[var(--color-steel)]">
              Don&apos;t have an account? <Link href="/contact" className="font-semibold" style={{ color: 'var(--color-red)' }}>Contact us</Link> to get registered.
            </p>
          </form>
        </div>
      </div>
    );
  }

  /* ---------------- roll-out page ---------------- */
  return (
    <div className="bg-[var(--color-warm-white)]">
      <section className="relative overflow-hidden bg-white">
        <img src="/img/heroes/hero-portal-login.jpg" alt="Anupam Paints secure portal login"
          className="w-full h-auto block" />
        <div className="not-sr-only md:sr-only container-wide px-4 py-6 md:py-0">
          <h1 className="text-2xl font-bold text-[var(--color-navy)] mb-2">Anupam Paints Portals</h1>
          <p className="text-sm text-[var(--color-steel)]">Being rolled out through 2026.</p>
        </div>
      </section>

      <div className="container-wide px-4 py-12 md:py-16 max-w-5xl">
        <div className="hidden md:block mb-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-5" />
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-3">Anupam Paints Portals</h1>
          <p className="text-[var(--color-steel)] max-w-2xl">
            We are building dedicated portals for our dealers, applicators, customers and staff.
            They are not open yet. Register below and we will contact you the moment yours goes live.
          </p>
        </div>

        <p className="md:hidden text-sm text-[var(--color-steel)] mb-8">
          We are building dedicated portals for our dealers, applicators, customers and staff.
          They are not open yet. Register below and we will contact you the moment yours goes live.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {PORTALS.map((p) => (
            <div key={p.name} className="card p-6">
              <h2 className="font-bold text-[var(--color-navy)] mb-1">{p.name}</h2>
              <p className="text-xs text-[var(--color-steel)] mb-4">{p.who}</p>
              <ul className="space-y-1.5">
                {p.what.map((w) => (
                  <li key={w} className="flex gap-2 text-sm text-gray-700">
                    <Check size={15} className="shrink-0 mt-0.5 text-[var(--color-red)]" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="card p-6 md:p-8 max-w-2xl">
          <h2 className="text-lg font-bold text-[var(--color-navy)] mb-1">Register your interest</h2>
          <p className="text-sm text-[var(--color-steel)] mb-6">
            Tell us which portal you need. We will get in touch when it opens — and in the
            meantime our team can help you directly.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Which portal do you need?</label>
              <select className="input-field" value={role} onChange={e => setRole(e.target.value)}>
                {PORTALS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Your name</label>
                <input className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Mobile number</label>
                <input className="input-field" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile" inputMode="tel" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Firm / company <span className="font-normal text-[var(--color-steel)]">(optional)</span></label>
              <input className="input-field" value={firm} onChange={e => setFirm(e.target.value)} placeholder="Business name" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={ready ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(enquiryText)}` : undefined}
                target="_blank" rel="noopener noreferrer"
                onClick={() => ready && setSent(true)}
                aria-disabled={!ready}
                className={`flex-1 font-semibold py-3.5 inline-flex items-center justify-center gap-2 transition ${
                  ready ? 'bg-[var(--color-red)] text-white hover:opacity-90'
                        : 'bg-gray-200 text-gray-400 pointer-events-none'}`}
                style={{ borderRadius: 'var(--radius-md)' }}>
                <MessageSquare size={16} /> Send on WhatsApp
              </a>
              <a
                href={ready ? `mailto:${EMAIL}?subject=${encodeURIComponent('Portal access request — ' + role)}&body=${encodeURIComponent(enquiryText)}` : undefined}
                aria-disabled={!ready}
                className={`flex-1 border font-semibold py-3.5 inline-flex items-center justify-center gap-2 transition ${
                  ready ? 'border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-gray-50'
                        : 'border-gray-200 text-gray-400 pointer-events-none'}`}
                style={{ borderRadius: 'var(--radius-md)' }}>
                <Mail size={16} /> Send by email
              </a>
            </div>

            {!ready && (
              <p className="text-xs text-[var(--color-steel)]">Enter your name and mobile number to continue.</p>
            )}
            {sent && (
              <p className="text-sm text-green-700 flex items-center gap-2 pt-1">
                <Check size={15} /> Thank you — we have your request and will be in touch.
              </p>
            )}
          </div>
        </div>

        <p className="text-sm text-[var(--color-steel)] mt-8">
          Need something now? Our team can place orders, share test certificates and send
          technical data directly — <Link href="/contact" className="font-semibold" style={{ color: 'var(--color-red)' }}>get in touch</Link>.
        </p>
      </div>
    </div>
  );
}
