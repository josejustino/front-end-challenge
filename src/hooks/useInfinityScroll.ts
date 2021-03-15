import { useEffect, useState, RefObject } from 'react';

export function useInfinityScroll(
  scrollObserve: RefObject<any | null>,
): number {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const ratio = entries[0].intersectionRatio;
        setScrollRatio(ratio);
      },
    );

    intersectionObserver.observe(scrollObserve.current);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [scrollObserve]);

  useEffect(() => {
    if (scrollRatio > 0) {
      setPage(p => p + 1);
    }
  }, [scrollRatio]);

  if (page === 0) return 1;

  return page;
}
