import { useEffect, useRef, useState } from 'react';

// A tiny IntersectionObserver hook for scroll-reveal animations
// Usage:
// const { ref, visible } = useScrollReveal();
// <section ref={ref} className={visible ? 'animate-enter' : 'opacity-0'}>...</section>
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current as Element | null;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...(options || {}) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible } as const;
}
