'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid username or password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-navy)] px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/img/logos/anupam-paints-logo.png" alt="Anupam Paints" className="h-12 mx-auto mb-4 brightness-0 invert" />
          <div className="inline-flex items-center gap-2 text-white/60 text-sm">
            <ShieldCheck size={16} /> Admin Panel — Authorized Access Only
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-4" style={{borderRadius:'var(--radius-lg)'}}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 flex items-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Username</label>
            <input className="input-field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter admin username" autoComplete="username" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Password</label>
            <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[var(--color-red)] text-white font-semibold py-3.5 hover:opacity-90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
            <Lock size={16} /> {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
          </button>
        </form>
      </div>
    </div>
  );
}
