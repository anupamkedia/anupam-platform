'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, User, Phone, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', role: 'retail_customer' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { first_name: form.firstName, last_name: form.lastName, phone: form.phone } },
      });
      if (authError) throw authError;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">Please check your email to verify your account.</p>
          <Link href="/login" className="btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Register on Anupam Paints Platform</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input required className="input-field" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input required className="input-field" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" required className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required minLength={6} className="input-field" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
            <select className="input-field" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
              <option value="retail_customer">Customer</option>
              <option value="dealer">Dealer</option>
              <option value="painter">Painter / Applicator</option>
              <option value="contractor">Contractor</option>
            </select></div>
          {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-50">
            {loading ? 'Creating...' : <><UserPlus size={18} className="mr-2" /> Create Account</>}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link href="/login" className="text-brand-500 font-medium hover:underline">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}
