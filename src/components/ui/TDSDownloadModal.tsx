'use client';
import { useState } from 'react';
import { X, Download, CheckCircle } from 'lucide-react';
import { ENQUIRY_TYPES } from '@/lib/constants';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId?: string;
  documentUrl?: string;
};

export default function TDSDownloadModal({ isOpen, onClose, productName, productId, documentUrl }: Props) {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', enquiry_type: 'TDS Download' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/api/tds-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product_id: productId }),
      });
      setStatus('done');
      // Trigger download after brief delay
      if (documentUrl) {
        setTimeout(() => { window.open(documentUrl, '_blank'); }, 1000);
      }
    } catch { setStatus('done'); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Download TDS</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded"><X size={20} /></button>
        </div>

        {status === 'done' ? (
          <div className="text-center py-6">
            <CheckCircle className="mx-auto text-green-500 mb-3" size={40} />
            <p className="font-medium text-gray-800 mb-1">Thank you!</p>
            <p className="text-sm text-gray-500">Your TDS for <strong>{productName}</strong> is downloading. Our team may follow up for technical support.</p>
            <button onClick={onClose} className="btn-outline mt-4 text-sm">Close</button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">Please share your details to download the Technical Data Sheet for <strong>{productName}</strong>.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required className="input-field" placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input className="input-field" placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
              <input required type="tel" className="input-field" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <input type="email" className="input-field" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-50">
                {status === 'sending' ? 'Processing...' : <><Download size={16} className="mr-2" /> Download TDS</>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
