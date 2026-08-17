import { Metadata } from 'next';
import { Briefcase, MapPin, Clock, Upload } from 'lucide-react';

export const metadata: Metadata = { title: 'Careers', description: 'Join Anupam Paints — career opportunities in sales, R&D, production, QC, technical service, and marketing.' };

const departments = ['Sales & Marketing', 'Research & Development', 'Production', 'Quality Control', 'Technical Service', 'Accounts & Finance', 'Human Resources', 'Dispatch & Logistics'];

export default function CareersPage() {
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Careers</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Build your career with a 50+ year legacy of manufacturing excellence.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title text-center mb-8">Departments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {departments.map((dept) => (
              <div key={dept} className="card p-4 text-center text-sm font-medium text-gray-700">
                <Briefcase className="mx-auto text-brand-400 mb-2" size={24} />
                {dept}
              </div>
            ))}
          </div>
          <div className="card p-8 text-center">
            <h3 className="text-xl font-bold text-brand-500 mb-2">Open Positions</h3>
            <p className="text-gray-600 mb-6">Current openings will be listed here. Send your resume for future opportunities.</p>
            <div className="bg-brand-50 rounded-xl p-6">
              <Upload className="mx-auto text-brand-400 mb-2" size={32} />
              <p className="text-sm text-gray-600 mb-4">Send your resume to <strong>hr@anupampaints.com</strong></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
