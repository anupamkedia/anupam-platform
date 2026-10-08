'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const PIXEL_ID = '464869025965732';

declare global {
  interface Window { fbq?: any }
}

/* Facebook's snippet fires PageView once, on first load. This site is a
   single-page app: moving from /products to /contact never reloads the page,
   so without this every view after the first would go unrecorded and your
   ad reporting would understate traffic badly. */
function PageViewOnRouteChange() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, search]);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
        `}
      </Script>

      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>

      {/* useSearchParams must sit inside Suspense in the App Router, or the
          whole page opts out of static rendering and gets slower. */}
      <Suspense fallback={null}>
        <PageViewOnRouteChange />
      </Suspense>
    </>
  );
}

/* Call this from a form when an enquiry is submitted, so Facebook can
   optimise your ads toward people who actually enquire rather than people
   who merely land. This is what makes the spend work harder. */
export function trackLead(source?: string) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', source ? { content_name: source } : undefined);
  }
}
