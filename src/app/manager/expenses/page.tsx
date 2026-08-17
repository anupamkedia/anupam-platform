'use client';
import { Receipt } from 'lucide-react';
export default function ManagerExpensesPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Expense Approval</h1>
    <p className="text-sm text-gray-500 mb-6">Approve or reject team expense claims</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Receipt className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Expense Approval with real-time team data from Supabase.</p>
    </div>
  </div>);
}