'use client';
import { useEffect, useRef, useState } from 'react';
import useWindowWidth from './useWindowWidth';
import SliderArrow from '@/app/components/SliderArrow';

const useHorizontalScroll = (scrollList?: any[]) => {
  const sliderRef = useRef<HTMLOListElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const mousePos = useRef({ startX: 0, scrollLeft: 0 });
  const [cursor, setCursor] = useState('auto');
  const { windowWidth } = useWindowWidth();

  const handleScroll = () => setScrollLeft(sliderRef.current!.scrollLeft);

  const SliderArrowLeft = (
    <SliderArrow
      direction='left'
      sliderRef={sliderRef}
      scrollLeft={scrollLeft}
      maxScrollLeft={maxScrollLeft}
    />
  );
  const SliderArrowRight = (
    <SliderArrow
      direction='right'
      sliderRef={sliderRef}
      scrollLeft={scrollLeft}
      maxScrollLeft={maxScrollLeft}
    />
  );

  useEffect(() => {
    if (sliderRef.current) {
      setMaxScrollLeft(
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
    }
  }, [windowWidth, scrollList]);

  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (mouseDown && sliderRef.current) {
        e.preventDefault();
        setCursor('grabbing');
        sliderRef.current.scrollLeft =
          mousePos.current.scrollLeft - (e.clientX - mousePos.current.startX);
      }
    };

    const handleDragEnd = () => {
      setMouseDown(false);
      setCursor('auto');
    };

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  });

  const handleDragStart = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    mousePos.current = {
      startX: e.clientX,
      scrollLeft: sliderRef.current.scrollLeft,
    };
    setMouseDown(true);
    setCursor('grab');
  };

  useEffect(() => {
    if (cursor) {
      document.body.style.cursor = cursor;
    }
  }, [cursor]);

  return {
    sliderRef,
    handleScroll,
    SliderArrowLeft,
    SliderArrowRight,
    handleDragStart,
    cursor,
    maxScrollLeft,
  };
};

export default useHorizontalScroll;
