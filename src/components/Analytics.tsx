'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { trackPageView } from '@/lib/track';

function Tracker() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    /* Don't record the admin panel — your own visits are not traffic. */
    if (pathname.startsWith('/admin')) return;
    trackPageView(pathname);
  }, [pathname, search]);

  return null;
}

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
