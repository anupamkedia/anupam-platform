'use client';
import { useState } from 'react';
import { Briefcase, Plus, Camera, Send, CheckCircle } from 'lucide-react';
export default function PainterProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
        <button onClick={()=>setShowForm(!showForm)} className="btn-primary text-sm"><Plus size={16} className="mr-2"/>Add Project</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label><input className="input-field" placeholder="e.g. Sharma Residence"/></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input className="input-field" placeholder="City, area"/></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Area (sq.ft)</label><input type="number" className="input-field"/></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Products Used</label><input className="input-field" placeholder="Azura Royal, Amaje Primer"/></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Before & After Photos</label>
            <div className="flex gap-3">
              <button type="button" className="flex flex-col items-center gap-1 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-orange-300 w-24"><Camera size={20} className="text-gray-400"/><span className="text-xs text-gray-500">Before</span></button>
              <button type="button" className="flex flex-col items-center gap-1 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-orange-300 w-24"><Camera size={20} className="text-gray-400"/><span className="text-xs text-gray-500">After</span></button>
            </div>
          </div>
          <div className="flex gap-3"><button className="btn-primary text-sm"><Send size={14} className="mr-2"/>Submit Project</button><button onClick={()=>setShowForm(false)} className="btn-outline text-sm">Cancel</button></div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="text-center py-8"><Briefcase className="mx-auto text-gray-300 mb-2" size={32}/><p className="text-sm text-gray-500">Register your painting projects with before-and-after photos to earn bonus points.</p></div>
      </div>
    </div>
  );
}
