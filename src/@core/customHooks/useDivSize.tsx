import { useEffect, useRef, useState, useCallback } from 'react';

const useDivSize = (dependency?: any) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    if (divRef.current) {
      setSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    updateSize(); // Set initial size

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [updateSize, dependency]); // Re-run when dependency (fullScreen) changes

  return { divRef, size };
};

export default useDivSize;
