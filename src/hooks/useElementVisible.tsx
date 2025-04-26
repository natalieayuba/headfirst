import { useEffect, useRef, useState } from 'react';

const useElementVisible = () => {
  let observedRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
