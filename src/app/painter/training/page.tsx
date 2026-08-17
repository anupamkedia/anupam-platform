'use client';
import { GraduationCap } from 'lucide-react';
export default function PainterTrainingPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Training</h1>
    <p className="text-sm text-gray-500 mb-6">Product application training videos and certification</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <GraduationCap className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Training will connect to painter loyalty system.</p>
    </div>
  </div>);
}