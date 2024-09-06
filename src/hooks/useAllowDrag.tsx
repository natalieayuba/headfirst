import { useRef, type MouseEvent } from 'react';

const useAllowDrag = () => {
  const xRef = useRef({ xBefore: 0, xAfter: 0 });

  const handleClick = (e: MouseEvent) => {
    if (xRef.current.xBefore !== xRef.current.xAfter) e.preventDefault();
  };
  const handleMouseDown = (e: MouseEvent) =>
    (xRef.current.xBefore = e.currentTarget.getBoundingClientRect().x);

  const handleMouseUp = (e: MouseEvent) =>
    (xRef.current.xAfter = e.currentTarget.getBoundingClientRect().x);

  const handleMouseLeave = (e: MouseEvent) =>
    (xRef.current.xAfter = e.currentTarget.getBoundingClientRect().x);

  return { handleClick, handleMouseDown, handleMouseUp, handleMouseLeave };
};

export default useAllowDrag;
