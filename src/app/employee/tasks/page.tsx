'use client';
import { ClipboardList, Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
export default function TasksPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        <button className="btn-primary text-sm"><Plus size={16} className="mr-2" /> New Task</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ label: 'Open', count: 0, icon: Clock, color: 'text-blue-500' }, { label: 'Overdue', count: 0, icon: AlertTriangle, color: 'text-red-500' }, { label: 'Completed', count: 0, icon: CheckCircle, color: 'text-green-500' }].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <s.icon className={`mx-auto mb-1 ${s.color}`} size={24} />
            <div className="text-xl font-bold text-gray-800">{s.count}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="text-center py-8"><ClipboardList className="mx-auto text-gray-300 mb-2" size={32} /><p className="text-sm text-gray-500">No tasks assigned.</p></div>
      </div>
    </div>
  );
}
