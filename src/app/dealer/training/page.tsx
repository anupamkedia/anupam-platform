'use client';
import { GraduationCap, Play, CheckCircle, Clock } from 'lucide-react';
const modules = [
  { title: 'Decorative Product Range Overview', duration: '15 min', category: 'Products', completed: false },
  { title: 'Industrial Coating Systems', duration: '20 min', category: 'Products', completed: false },
  { title: 'Azura Luxury Range — Features & Selling Points', duration: '12 min', category: 'Products', completed: false },
  { title: 'Waterproofing Solutions — Arest Range', duration: '10 min', category: 'Products', completed: false },
  { title: 'Surface Preparation Guide', duration: '18 min', category: 'Application', completed: false },
  { title: 'How to Use the Warranty System', duration: '8 min', category: 'Systems', completed: false },
  { title: 'Scheme & Campaign Participation', duration: '10 min', category: 'Systems', completed: false },
  { title: 'Handling Customer Complaints', duration: '12 min', category: 'Service', completed: false },
];
export default function DealerTrainingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Training</h1>
      <p className="text-sm text-gray-500 mb-6">Complete training modules to improve product knowledge and earn bonus points</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">0/{modules.length}</div><div className="text-xs text-gray-500">Modules Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">0</div><div className="text-xs text-gray-500">Points Earned</div>
        </div>
      </div>
      <div className="space-y-3">
        {modules.map((m, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0"><Play size={18}/></div>
            <div className="flex-1">
              <div className="font-medium text-gray-800 text-sm">{m.title}</div>
              <div className="text-xs text-gray-400"><Clock size={10} className="inline mr-1"/>{m.duration} · {m.category}</div>
            </div>
            {m.completed ? <CheckCircle className="text-green-500" size={20}/> : <span className="badge bg-gray-100 text-gray-500 text-xs">Start</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
