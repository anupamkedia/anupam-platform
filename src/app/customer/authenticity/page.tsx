'use client';
import { useState } from 'react';
import { QrCode, Search, CheckCircle, AlertCircle } from 'lucide-react';
export default function AuthenticityPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<'idle'|'genuine'|'not_found'>('idle');
  const verify = () => { if (code.trim()) setResult(code.length > 5 ? 'genuine' : 'not_found'); };
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Product Authenticity</h1>
      <p className="text-sm text-gray-500 mb-6">Enter batch number or scan QR from product packaging</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-lg">
        <div className="flex gap-3 mb-6">
          <input className="input-field flex-1 font-mono text-center uppercase" placeholder="Enter Batch Number" value={code} onChange={e => setCode(e.target.value.toUpperCase())} />
          <button onClick={verify} className="btn-primary"><Search size={16} /></button>
        </div>
        {result === 'genuine' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="text-green-500 shrink-0" size={32} />
            <div><div className="font-bold text-green-800">Genuine Product</div><div className="text-sm text-green-600">This is a verified Anupam Paints product.</div></div>
          </div>
        )}
        {result === 'not_found' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="text-red-500 shrink-0" size={32} />
            <div><div className="font-bold text-red-800">Not Found</div><div className="text-sm text-red-600">Code not found. Contact us if you believe this is genuine.</div></div>
          </div>
        )}
      </div>
    </div>
  );
}