import {
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type MouseEvent,
} from 'react';

const useLoader = () => {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isPending) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isPending]);

  const loadPage = (
    onClick: (e: MouseEvent) => void,
    afterClick?: () => void,
    e?: MouseEvent | ChangeEvent
  ) => {
    setLoading(true);
    startTransition(() => {
      if (e) {
        e.preventDefault();
      }
      setTimeout(() => {
        onClick(e as MouseEvent);
        if (afterClick) {
          afterClick();
        }
      }, 300);
    });
  };

  return { loading, loadPage };
};

export default useLoader;
