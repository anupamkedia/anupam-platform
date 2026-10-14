'use client';

import Script from 'next/script';

const PARTNER_ID = '11083281';

declare global {
  interface Window { lintrk?: any; _linkedin_data_partner_ids?: string[] }
}

/* LinkedIn's tag tracks page views by itself once loaded — unlike GA4 and the
   Meta pixel it listens to history changes internally, so no manual route
   handling is needed here. */
export default function LinkedInInsight() {
  return (
    <>
      <Script id="li-partner" strategy="afterInteractive">
        {`
window._linkedin_partner_id = "${PARTNER_ID}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push("${PARTNER_ID}");
        `}
      </Script>
      <Script id="li-insight" strategy="afterInteractive"
        src="https://snap.licdn.com/li.lms-analytics/insight.min.js" />

      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${PARTNER_ID}&fmt=gif`} />
      </noscript>
    </>
  );
}

/** Report an enquiry to LinkedIn as a conversion. Needs a conversion ID
 *  created in Campaign Manager first — until then this does nothing. */
export function liLead(conversionId?: number) {
  if (typeof window !== 'undefined' && window.lintrk && conversionId) {
    window.lintrk('track', { conversion_id: conversionId });
  }
}
