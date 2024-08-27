import { useEffect, type RefObject } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isOutside =
        (Array.isArray(ref) &&
          !ref.some((r) => r.current && r.current?.contains(target))) ||
        ((ref as RefObject<HTMLElement>).current &&
          (ref as RefObject<HTMLElement>).current?.contains(target));

      if (isOutside) {
        onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref, onClickOutside]);
};

export default useClickOutside;
