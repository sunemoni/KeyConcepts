import { useEffect, useRef, useState } from 'react';

/**
 * Adds the `is-visible` class to an element when it scrolls into view,
 * enabling the CSS reveal transition. Returns a ref to attach to the
 * element you want to animate in.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Tracks the section currently in view so the sticky nav can highlight it.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}
