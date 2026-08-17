'use client';
import { useState, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: method === 'email' ? email : `${phone.replace(/[^0-9]/g, '')}@phone.anupampaints.com`,
        password,
      });
      if (authError) throw authError;
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to Anupam Paints Platform</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button onClick={() => setMethod('email')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${method === 'email' ? 'bg-white shadow text-brand-500' : 'text-gray-500'}`}>
            <Mail size={14} className="inline mr-1" /> Email
          </button>
          <button onClick={() => setMethod('phone')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${method === 'phone' ? 'bg-white shadow text-brand-500' : 'text-gray-500'}`}>
            <Phone size={14} className="inline mr-1" /> Phone
          </button>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {method === 'email' ? (
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" required className="input-field !pl-10" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" /></div></div>
          ) : (
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative"><Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" required className="input-field !pl-10" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 9876543210" /></div></div>
          )}
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative"><Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type={showPassword ? 'text' : 'password'} required className="input-field !pl-10 !pr-10" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></div>
          {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-50">
            {loading ? 'Signing in...' : <><LogIn size={18} className="mr-2" /> Sign In</>}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link href="/signup" className="text-brand-500 font-medium hover:underline">Create account</Link>
          <span className="text-gray-300 mx-2">|</span>
          <Link href="/" className="text-gray-500 hover:text-gray-700">Back to website</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}><LoginForm /></Suspense>;
}
