import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ExitIntent from '@/components/layout/ExitIntent';

import { Montserrat, DM_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dmsans',
  display: 'swap',
});


export const metadata: Metadata = {
  title: {
    default: 'Anupam Paints — Industrial, Decorative & Specialty Coatings Manufacturer Since 1972',
    template: '%s | Anupam Paints',
  },
  description: "India's trusted manufacturer of industrial, decorative, marine, railway, and specialty coatings. 50+ years of excellence. ISO certified. Government approved. Kolkata, India.",
  keywords: ['industrial paint manufacturer India', 'protective coatings manufacturer', 'epoxy paint manufacturer Kolkata', 'railway approved paint manufacturer', 'marine paint manufacturer India', 'decorative paint manufacturer', 'fire retardant coating India'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Anupam Paints',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
            <ExitIntent />
      
        <script dangerouslySetInnerHTML={{__html: `
          document.addEventListener('contextmenu', function(e) {
            if (!e.target.closest('a[href$=".pdf"]') && !e.target.closest('.allow-context')) {
              e.preventDefault();
            }
          });
          document.addEventListener('dragstart', function(e) {
            if (e.target.tagName === 'IMG') e.preventDefault();
          });
          document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'u')) {
              e.preventDefault();
            }
          });
        `}} />
      </body>
    </html>
  );
}
