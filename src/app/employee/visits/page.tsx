'use client';
import { useState } from 'react';
import { Navigation, Store, Users, Building2, Plus, MapPin, Camera, Clock, Save, ChevronDown } from 'lucide-react';

type VisitType = 'dealer' | 'painter' | 'project' | 'institutional';

export default function VisitsPage() {
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');
  const [visitType, setVisitType] = useState<VisitType>('dealer');
  const [showForm, setShowForm] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const visitTypes = [
    { key: 'dealer' as VisitType, label: 'Dealer Visit', icon: Store, color: 'bg-blue-500' },
    { key: 'painter' as VisitType, label: 'Painter Visit', icon: Users, color: 'bg-green-500' },
    { key: 'project' as VisitType, label: 'Project / Site Visit', icon: Building2, color: 'bg-purple-500' },
    { key: 'institutional' as VisitType, label: 'Institutional Visit', icon: Building2, color: 'bg-amber-500' },
  ];

  const captureGPS = async () => {
    setCapturing(true);
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true })
      );
      alert(`Location captured: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
    } catch { alert('Unable to capture GPS'); }
    setCapturing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Visit Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus size={16} className="mr-2" /> Log Visit
        </button>
      </div>

      {/* Visit type selector */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">New Visit</h2>

          {/* Type selection */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {visitTypes.map((vt) => (
              <button key={vt.key} onClick={() => setVisitType(vt.key)}
                className={`p-3 rounded-xl border-2 transition text-center ${visitType === vt.key ? 'border-brand-500 bg-brand-50' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className={`w-10 h-10 rounded-lg ${vt.color} text-white flex items-center justify-center mx-auto mb-2`}>
                  <vt.icon size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">{vt.label}</span>
              </button>
            ))}
          </div>

          {/* GPS check-in */}
          <div className="bg-brand-50 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="text-brand-500" size={20} />
              <div>
                <div className="text-sm font-medium text-gray-800">GPS Check-in</div>
                <div className="text-xs text-gray-500">Capture your location to validate this visit</div>
              </div>
            </div>
            <button onClick={captureGPS} disabled={capturing} className="btn-primary text-sm !px-4 !py-2">
              {capturing ? 'Capturing...' : 'Capture Location'}
            </button>
          </div>

          {/* Dealer visit form */}
          {visitType === 'dealer' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Dealer Name *</label>
                  <input className="input-field" placeholder="Search or select dealer" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Visit Purpose</label>
                  <select className="input-field">
                    <option>Regular Visit</option><option>Collection Follow-up</option><option>Order Collection</option>
                    <option>Complaint</option><option>New Scheme Introduction</option><option>Display Check</option>
                  </select></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Stock Audit Notes</label>
                <textarea className="input-field" rows={2} placeholder="Fast-moving products, slow-moving, out of stock..." /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Competitor Activity</label>
                <textarea className="input-field" rows={2} placeholder="Competitor brands seen, pricing, offers..." /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Amount</label>
                  <input type="number" className="input-field" placeholder="₹" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Order Requirement</label>
                  <input className="input-field" placeholder="Products and quantities needed" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Dealer Feedback</label>
                <textarea className="input-field" rows={2} placeholder="Any feedback, complaints, or suggestions..." /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                  <input type="date" className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Next Action</label>
                  <input className="input-field" placeholder="What needs to happen next?" /></div>
              </div>
            </div>
          )}

          {/* Project visit form */}
          {visitType === 'project' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                  <input className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer / Company</label>
                  <input className="input-field" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Site Address</label>
                <input className="input-field" /></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                  <select className="input-field">
                    <option>Residential</option><option>Commercial</option><option>Industrial</option>
                    <option>Infrastructure</option><option>Government</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Stage</label>
                  <select className="input-field">
                    <option>Planning</option><option>Specification</option><option>Execution</option><option>Maintenance</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value (₹)</label>
                  <input type="number" className="input-field" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Area (sq.ft)</label>
                  <input type="number" className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Paint Requirement (litres)</label>
                  <input type="number" className="input-field" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Products Proposed</label>
                <textarea className="input-field" rows={2} placeholder="List the products and coating system proposed" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Technical Observations</label>
                <textarea className="input-field" rows={2} placeholder="Surface condition, challenges, recommendations..." /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Expected Closure Date</label>
                  <input type="date" className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Order Probability</label>
                  <select className="input-field">
                    <option>Hot (80%+)</option><option>Warm (50-80%)</option><option>Cold (&lt;50%)</option>
                  </select></div>
              </div>
            </div>
          )}

          {/* Painter / Institutional forms similar structure */}
          {(visitType === 'painter' || visitType === 'institutional') && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">{visitType === 'painter' ? 'Painter' : 'Institutional'} visit form — same structured format with:</p>
              <p className="text-xs text-gray-400 mt-2">Name, GPS check-in, photo upload, product discussion, competitor info, follow-up date, and action items.</p>
            </div>
          )}

          {/* Photo upload */}
          <div className="mt-6 border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Visit Photos</label>
            <div className="flex gap-3">
              <button className="flex flex-col items-center gap-1 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-brand-300 transition w-24">
                <Camera size={20} className="text-gray-400" />
                <span className="text-xs text-gray-500">Camera</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-brand-300 transition w-24">
                <Plus size={20} className="text-gray-400" />
                <span className="text-xs text-gray-500">Gallery</span>
              </button>
            </div>
          </div>

          {/* Save */}
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <button className="btn-primary"><Save size={16} className="mr-2" /> Submit Visit Report</button>
            <button onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
          </div>
        </div>
      )}

      {/* Visit history */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4">Recent Visits</h2>
        <div className="text-center py-8">
          <Navigation className="mx-auto text-gray-300 mb-2" size={32} />
          <p className="text-sm text-gray-500">No visits recorded yet.</p>
          <p className="text-xs text-gray-400 mt-1">Your dealer, painter, and project visits will appear here.</p>
        </div>
      </div>
    </div>
  );
}
