import { useEffect, useState } from 'react';

const useViewportHeight = () => {
  const [maxHeight, setMaxHeight] = useState(
    typeof window != 'undefined' ? window.visualViewport?.height : 0
  );

  useEffect(() => {
    const handleIosViewport = () => {
      setMaxHeight(window.visualViewport?.height);
    };
    window.visualViewport?.addEventListener('resize', handleIosViewport);
    return () =>
      window.visualViewport?.removeEventListener('resize', handleIosViewport);
  }, [maxHeight]);

  return { maxHeight };
};

export default useViewportHeight;
