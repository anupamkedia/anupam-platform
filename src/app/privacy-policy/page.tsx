import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Privacy Policy' };
export default function PrivacyPolicyPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-wide max-w-3xl">
        <h1 className="text-3xl font-bold text-brand-500 mb-6">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
          <p><strong>Last Updated:</strong> July 2026</p>
          <p>Anupam Enterprises (&quot;Anupam Paints&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting the privacy of our customers, dealers, contractors, and website visitors. This Privacy Policy explains how we collect, use, store, and protect your personal data in compliance with the Digital Personal Data Protection Act, 2023 (DPDPA) and applicable Indian laws.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly: name, company name, phone number, email address, postal address, GST number (for dealers), and product preferences. For employees using our SFA system, we collect GPS location data during authorised working hours only, with explicit consent. For painters using our loyalty programme, we collect mobile number, address, and scan/purchase data.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">2. How We Use Your Information</h2>
          <p>We use your data to: process enquiries and provide quotations; manage dealer and painter accounts; send product updates, scheme information, and warranty notifications; improve our products and services; comply with legal and regulatory obligations; and, for employees, manage field operations and attendance (with consent).</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">3. Data Sharing</h2>
          <p>We do not sell your personal data. We may share it with: our authorised dealers (for order fulfilment); logistics partners (for delivery); payment gateways (for transactions); SMS/email/WhatsApp service providers (for communications); and legal authorities (when required by law).</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">4. Data Security</h2>
          <p>We implement TLS encryption, access controls, regular backups, and industry-standard security measures. Sensitive data like payment information is encrypted at rest using AES-256.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">5. Your Rights (DPDPA)</h2>
          <p>You have the right to: access your personal data; correct inaccurate data; request deletion of your data; withdraw consent for processing; and lodge a grievance. To exercise these rights, contact us at privacy@anupampaints.com.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">6. GPS Tracking Disclosure</h2>
          <p>Employee GPS tracking is activated only during defined working hours, with written consent. Tracking data is accessible only to authorised managers and is retained for 90 days. Employees can view their own tracking data at any time.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">7. Contact Us</h2>
          <p>Data Protection Officer: Anupam Enterprises, 113 Park Street, Poddar Point, Kolkata – 700064. Email: privacy@anupampaints.com</p>
        </div>
      </div>
    </div>
  );
}
