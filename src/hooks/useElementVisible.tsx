import { useEffect, useRef, useState, type RefObject } from 'react';

const useElementVisible = (ref?: RefObject<Element>) => {
  let observedRef = useRef<Element>(null);
  const [visible, setVisible] = useState(false);

  if (ref) {
    observedRef = ref;
  }

  useEffect(() => {
    if (observedRef.current) {
      const observed = observedRef.current;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      });

      observer.observe(observed);
      return () => observer.unobserve(observed);
    }
  });

  return { observedRef, visible };
};

export default useElementVisible;
