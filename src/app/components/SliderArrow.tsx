import { type ComponentProps, type RefObject } from 'react';
import Icon from './Icon';

interface SliderArrowProps {
  direction: string;
  sliderRef: RefObject<HTMLOListElement>;
  scrollLeft: number;
  maxScrollLeft: number;
}

const SliderArrow = ({
  direction,
  sliderRef,
  scrollLeft,
  maxScrollLeft,
  ...rest
}: SliderArrowProps & ComponentProps<'button'>) => {
  const handleClick = () => {
    const slider = sliderRef.current!;
    if (direction === 'right') {
      slider.scroll({
        left: slider.scrollLeft + slider.clientWidth,
        behavior: 'smooth',
      });
    } else if (direction === 'left') {
      slider.scroll({
        left: slider.scrollLeft - slider.clientWidth,
        behavior: 'smooth',
      });
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
