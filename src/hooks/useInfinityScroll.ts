import React, { useEffect, useState } from 'react';

interface useInfinityScrollProps {
  scrollObserve: React.MutableRefObject<HTMLDivElement>;
}

export const useInfinityScroll = ({
  scrollObserve,
}: useInfinityScrollProps): number => {
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
      setPage(prevPage => prevPage + 1);
    }
  }, [scrollRatio]);

  if (page === 0) return 1;

  return page;
};
