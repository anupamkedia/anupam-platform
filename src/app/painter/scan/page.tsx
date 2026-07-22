'use client';
import { useState } from 'react';
import { QrCode, Camera, Keyboard, CheckCircle, AlertCircle, Send } from 'lucide-react';

export default function PainterScanPage() {
  const [mode, setMode] = useState<'qr' | 'code'>('code');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'duplicate'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ painter_id: 'demo-painter', scan_type: mode === 'qr' ? 'QR' : 'coupon', code: code.trim() }),
      });
      const data = await res.json();
      if (res.ok) { setStatus('success'); setMessage(data.message || 'Code submitted for verification!'); setCode(''); }
      else if (data.duplicate) { setStatus('duplicate'); setMessage('This code has already been used.'); }
      else { setStatus('error'); setMessage(data.error || 'Something went wrong.'); }
    } catch { setStatus('error'); setMessage('Network error. Please try again.'); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Scan & Earn Points</h1>
      <p className="text-sm text-gray-500 mb-6">Scan product QR code or enter coupon code to earn loyalty points.</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setMode('qr')} className={`flex-1 p-4 rounded-xl border-2 text-center transition ${mode === 'qr' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
          <Camera className={`mx-auto mb-1 ${mode === 'qr' ? 'text-orange-500' : 'text-gray-400'}`} size={24} />
          <span className="text-sm font-medium">Scan QR</span>
        </button>
        <button onClick={() => setMode('code')} className={`flex-1 p-4 rounded-xl border-2 text-center transition ${mode === 'code' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
          <Keyboard className={`mx-auto mb-1 ${mode === 'code' ? 'text-orange-500' : 'text-gray-400'}`} size={24} />
          <span className="text-sm font-medium">Enter Code</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {mode === 'qr' ? (
          <div className="text-center py-8">
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
              <QrCode size={64} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-500 mb-4">Point your camera at the QR code on the product packaging</p>
            <button className="btn-primary"><Camera size={16} className="mr-2" /> Open Camera</button>
            <p className="text-xs text-gray-400 mt-3">Camera access requires HTTPS and device permission</p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Product Code / Coupon Code</label>
            <div className="flex gap-3">
              <input type="text" className="input-field flex-1 text-lg font-mono tracking-wider text-center uppercase" placeholder="XXXX-XXXX-XXXX"
                value={code} onChange={e => setCode(e.target.value.toUpperCase())} maxLength={20} />
              <button onClick={handleSubmit} disabled={!code.trim() || status === 'submitting'} className="btn-primary shrink-0 disabled:opacity-50">
                {status === 'submitting' ? '...' : <Send size={18} />}
              </button>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="text-green-500 shrink-0" size={24} />
            <div><div className="font-medium text-green-800">Submitted!</div><div className="text-sm text-green-600">{message}</div></div>
          </div>
        )}
        {status === 'duplicate' && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="text-yellow-500 shrink-0" size={24} />
            <div><div className="font-medium text-yellow-800">Already Used</div><div className="text-sm text-yellow-600">{message}</div></div>
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="text-red-500 shrink-0" size={24} />
            <div><div className="font-medium text-red-800">Error</div><div className="text-sm text-red-600">{message}</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
