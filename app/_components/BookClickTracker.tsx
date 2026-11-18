'use client';

import { useEffect } from 'react';

const BOOK_HOSTS = new Set(['howtowinatmath.com', 'www.howtowinatmath.com']);

/**
 * Sends a GA4 `book_click` event whenever a reader clicks any link to the
 * sales page. The link's `data-cta` attribute says where it was (header, top,
 * mid, end, sticky, author-bio, hub, home, footer); links inside article text
 * report as `inline`. Does nothing if GA4 is not loaded.
 */
export default function BookClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.('a');
      if (!link || !link.href) return;
      let url: URL;
      try {
        url = new URL(link.href);
      } catch {
        return;
      }
      if (!BOOK_HOSTS.has(url.hostname)) return;
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag !== 'function') return;
      w.gtag('event', 'book_click', {
        cta_location: link.getAttribute('data-cta') || 'inline',
        link_url: url.href,
        page_path: window.location.pathname,
        transport_type: 'beacon',
      });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
