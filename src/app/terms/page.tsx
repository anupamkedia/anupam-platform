import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Terms of Use' };
export default function TermsPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-wide max-w-3xl">
        <h1 className="text-3xl font-bold text-brand-500 mb-6">Terms of Use</h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
          <p><strong>Effective Date:</strong> July 2026</p>
          <p>By accessing anupampaints.com or any Anupam Paints portal (dealer, painter, employee, customer), you agree to these terms.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">1. Use of Website</h2>
          <p>This website is for informational purposes and business transactions. You agree not to misuse any portal, attempt unauthorised access, or use the platform for any unlawful purpose.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">2. Product Information</h2>
          <p>Product specifications, coverage rates, and technical data on this website are indicative. Actual performance depends on surface condition, application method, and environmental factors. Always refer to the latest TDS for accurate specifications. Contact our technical team for project-specific recommendations.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">3. Intellectual Property</h2>
          <p>All content, images, brand names (AZURA, ASURE, ANEX, ATOP, AMAJE, AREST, FireSeal), and technical data on this website are the intellectual property of Anupam Enterprises and may not be reproduced without written permission.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">4. Warranty Terms</h2>
          <p>Product warranties are subject to proper surface preparation, application by approved methods, and registration through the warranty portal. Warranty terms vary by product and application. Refer to specific warranty documentation for complete terms.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">5. Limitation of Liability</h2>
          <p>Anupam Enterprises shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our products beyond the product replacement value. Our maximum liability is limited to the purchase price of the products in question.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">6. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-8">7. Contact</h2>
          <p>Anupam Enterprises, 113 Park Street, Poddar Point, Kolkata – 700064. Email: legal@anupampaints.com</p>
        </div>
      </div>
    </div>
  );
}
