'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'htwam-bookbar-dismissed';

function wasDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    // Storage can be unavailable (private mode, blocked site data); treat as not dismissed.
    return false;
  }
}

/**
 * A slim bar pinned to the bottom of article pages. It appears once the reader
 * has scrolled past the intro, hides again when the end-of-article call to
 * action comes into view, and can be dismissed for the rest of the visit.
 */
export default function StickyBookBar({ href, facts }: { href: string; facts: string }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const update = () => {
      if (wasDismissed()) {
        setVisible(false);
        return;
      }
      const end = document.querySelector('.cta-end');
      const reachedEnd = end ? end.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(window.scrollY > 900 && !reachedEnd);
    };

    const frame = window.requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Ignore: dismissal just will not persist across pages.
    }
  };

  return (
    <div
      className={`sticky-book-bar${visible ? ' is-visible' : ''}`}
      role="complementary"
      aria-label="Get the book"
      aria-hidden={!visible}
    >
      <div className="sticky-book-inner">
        <p className="sticky-book-text">
          <strong>How to Win at Mathematics</strong>
          <span className="sticky-book-sub">{facts}</span>
          <span className="sticky-book-sub-short">$5 ebook · 30-day guarantee</span>
        </p>
        <a href={href} className="btn-cta sticky-book-btn" data-cta="sticky" tabIndex={visible ? 0 : -1}>
          Get the ebook
        </a>
        <button
          type="button"
          className="sticky-book-close"
          aria-label="Dismiss"
          onClick={dismiss}
          tabIndex={visible ? 0 : -1}
        >
          ×
        </button>
      </div>
    </div>
  );
}
