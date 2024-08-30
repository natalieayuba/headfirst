import {
  startTransition,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';

const useLoader = () => {
  const [loading, setLoading] = useState(false);

  const loadPage = (
    onClick: () => void,
    afterClick?: () => void,
    e?: MouseEvent | ChangeEvent
  ) => {
    setLoading(true);
    startTransition(() => {
      if (e !== undefined) {
        e.preventDefault();
      }
      setTimeout(() => {
        onClick();
        setTimeout(() => {
          setLoading(false);
          if (afterClick !== undefined) {
            afterClick();
          }
        }, 300);
      }, 300);
    });
  };

  return { loading, loadPage };
};

export default useLoader;
