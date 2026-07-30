'use client';
import { useState } from 'react';
import { Calendar, Plus, MapPin, Save, Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const visitTypes = ['Dealer Visit', 'Painter Visit', 'Project Site', 'Institutional', 'Contractor', 'Architect/Consultant', 'New Prospect', 'Collection'];

export default function TourPlanPage() {
  const [planType, setPlanType] = useState<'daily' | 'weekly'>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [visits, setVisits] = useState<{ type: string; entity: string; purpose: string; time: string }[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newVisit, setNewVisit] = useState({ type: 'Dealer Visit', entity: '', purpose: '', time: '10:00' });

  const addVisit = () => {
    if (!newVisit.entity) return;
    setVisits([...visits, { ...newVisit }]);
    setNewVisit({ type: 'Dealer Visit', entity: '', purpose: '', time: '' });
    setShowAdd(false);
  };

  const removeVisit = (i: number) => setVisits(visits.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tour Plan</h1>
        <div className="flex gap-2">
          {(['daily', 'weekly'] as const).map(t => (
            <button key={t} onClick={() => setPlanType(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${planType === t ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Date selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center justify-between">
        <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() - 1); setSelectedDate(d.toISOString().split('T')[0]); }} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20} /></button>
        <div className="text-center">
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="text-lg font-bold text-brand-500 border-none text-center cursor-pointer" />
        </div>
        <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() + 1); setSelectedDate(d.toISOString().split('T')[0]); }} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={20} /></button>
      </div>

      {/* Planned visits */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Planned Visits ({visits.length})</h2>
          <button onClick={() => setShowAdd(true)} className="btn-primary text-sm !px-3 !py-1.5"><Plus size={14} className="mr-1" /> Add Visit</button>
        </div>

        {visits.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-sm text-gray-500">No visits planned for this date.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visits.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-sm">{v.entity}</div>
                  <div className="text-xs text-gray-500">{v.type} · {v.purpose} {v.time && `· ${v.time}`}</div>
                </div>
                <button onClick={() => removeVisit(i)} className="p-1.5 text-gray-400 hover:text-red-500 rounded"><XCircle size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add visit modal */}
      {showAdd && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4 space-y-4">
          <h3 className="font-bold text-gray-800">Add Visit to Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Visit Type</label>
              <select className="input-field" value={newVisit.type} onChange={e => setNewVisit({ ...newVisit, type: e.target.value })}>
                {visitTypes.map(t => <option key={t}>{t}</option>)}
              </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="time" className="input-field" value={newVisit.time} onChange={e => setNewVisit({ ...newVisit, time: e.target.value })} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Dealer / Person / Site Name *</label>
            <input className="input-field" value={newVisit.entity} onChange={e => setNewVisit({ ...newVisit, entity: e.target.value })} placeholder="Who or where are you visiting?" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <input className="input-field" value={newVisit.purpose} onChange={e => setNewVisit({ ...newVisit, purpose: e.target.value })} placeholder="Purpose of this visit" /></div>
          <div className="flex gap-3">
            <button onClick={addVisit} className="btn-primary text-sm"><Plus size={14} className="mr-1" /> Add</button>
            <button onClick={() => setShowAdd(false)} className="btn-outline text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Submit */}
      {visits.length > 0 && (
        <button className="btn-primary w-full md:w-auto"><Save size={16} className="mr-2" /> Submit Tour Plan for Approval</button>
      )}
    </div>
  );
}
