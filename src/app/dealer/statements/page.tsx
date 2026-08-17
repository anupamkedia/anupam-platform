'use client';
import { FileText, Download, Calendar, DollarSign } from 'lucide-react';
export default function DealerStatementsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Statements</h1>
      <p className="text-sm text-gray-500 mb-6">View your ledger, invoices, payments, and outstanding balance</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[{label:'Total Purchases',value:'₹0',icon:DollarSign,color:'bg-blue-500'},{label:'Payments Made',value:'₹0',icon:DollarSign,color:'bg-green-500'},{label:'Outstanding',value:'₹0',icon:DollarSign,color:'bg-amber-500'},{label:'Overdue',value:'₹0',icon:DollarSign,color:'bg-red-500'}].map(s=>(
          <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className={`w-9 h-9 rounded-lg ${s.color} text-white flex items-center justify-center mb-2`}><s.icon size={18}/></div>
            <div className="text-xl font-bold text-gray-800">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Recent Transactions</h2>
          <button className="btn-outline text-sm !py-1.5"><Download size={14} className="mr-1"/> Download Statement</button>
        </div>
        <p className="text-sm text-gray-500 text-center py-8">Account statements will populate from Tally integration. Your ledger, invoices, credit notes, and payment history will appear here.</p>
      </div>
    </div>
  );
}
