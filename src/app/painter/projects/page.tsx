'use client';
import { Briefcase } from 'lucide-react';
export default function PainterProjectsPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">My Projects</h1>
    <p className="text-sm text-gray-500 mb-6">Register projects with before/after photos to earn bonus points</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Briefcase className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">My Projects will connect to painter loyalty system.</p>
    </div>
  </div>);
}