import {
  useEffect,
  useState,
  type ComponentProps,
  type ForwardedRef,
  type RefObject,
} from 'react';
import Icon from './Icon';

interface SliderArrowProps {
  direction: 'right' | 'left';
  sliderRef: ForwardedRef<HTMLElement>;
  scrollLeft: number;
}

const SliderArrow = ({
  direction,
  sliderRef,
  scrollLeft,
  ...rest
}: SliderArrowProps & ComponentProps<'button'>) => {
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);

  useEffect(() => {
    if ((sliderRef as RefObject<HTMLElement>)?.current) {
      const slider = (sliderRef as RefObject<HTMLElement>)?.current!;
      setMaxScrollLeft(slider.scrollWidth - slider.clientWidth);
    }
  }, [sliderRef]);

  const handleClick = () => {
    const slider = (sliderRef as RefObject<HTMLElement>).current!;
    if (direction === 'right') {
      slider.scrollLeft += slider.clientWidth;
    } else if (direction === 'left') {
      slider.scrollLeft -= slider.clientWidth;
    }
  };

  const disabled =
    (direction === 'left' && scrollLeft === 0) ||
    (direction === 'right' && scrollLeft === maxScrollLeft);

  return (
    <button
      className='transition-all duration-150 disabled:opacity-30 enabled:hover:scale-[115%]'
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      <Icon size={32} name={`angle-${direction}`} />
    </button>
  );
};
export default SliderArrow;
