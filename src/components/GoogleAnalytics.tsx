'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const GA_ID = 'G-319361EGXW';

declare global {
  interface Window { dataLayer?: any[]; gtag?: (...args: any[]) => void }
}

/* GA4's own snippet records one page_view at load. This site is a single-page
   app — /products to /contact never reloads — so every later view would go
   uncounted. send_page_view is therefore turned off in config and fired
   manually on each route change, which also avoids a double count of the
   first page. */
function PageViews() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    const qs = search?.toString();
    window.gtag('event', 'page_view', {
      page_path: pathname + (qs ? `?${qs}` : ''),
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}

export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}

/* Report an enquiry to GA4 as a conversion, so Google Analytics shows the
   same picture as your own admin analytics and the Meta pixel. */
export function gaLead(source?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', source ? { source } : undefined);
  }
}
