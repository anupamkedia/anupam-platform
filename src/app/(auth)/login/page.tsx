'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(true);
  };

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
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 flex items-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
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
          <button type="submit" className="w-full bg-[var(--color-red)] text-white font-semibold py-3.5 hover:opacity-90 transition inline-flex items-center justify-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
            <Lock size={16} /> Sign In
          </button>
          <p className="text-xs text-center text-[var(--color-steel)]">
            Don&apos;t have an account? <Link href="/contact" className="font-semibold" style={{color:'var(--color-red)'}}>Contact us</Link> to get registered.
          </p>
        </form>
      </div>
    </div>
  );
}
