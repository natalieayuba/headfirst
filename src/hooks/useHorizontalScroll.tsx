'use client';
import { useEffect, useRef, useState } from 'react';
import useWindowWidth from './useWindowWidth';
import SliderArrow from '@/app/components/SliderArrow';

const useHorizontalScroll = (scrollList?: any[]) => {
  const sliderRef = useRef<HTMLOListElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const mousePos = useRef({
    startX: 0,
    scrollLeft: 0,
    distance: 0,
    elastic: false,
  });
  const [cursor, setCursor] = useState('auto');
  const { windowWidth } = useWindowWidth();
  const delta = 0.25;
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

  const handleDragStart = (e: React.MouseEvent) => {
    if (sliderRef.current) {
      mousePos.current.startX = e.clientX;
      mousePos.current.scrollLeft = sliderRef.current.scrollLeft;
      setMouseDown(true);
      setCursor('grab');
      sliderRef.current.style.transition = '';
    }
  };

  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (mouseDown && sliderRef.current) {
        e.preventDefault();
        setCursor('grabbing');
        mousePos.current.distance = e.clientX - mousePos.current.startX;
        const leftBoundary = sliderRef.current.scrollLeft === 0;
        const rightBoundary =
          sliderRef.current.scrollLeft ===
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        mousePos.current.elastic = leftBoundary || rightBoundary;
        sliderRef.current.scrollLeft =
          mousePos.current.scrollLeft - mousePos.current.distance;
        if (mousePos.current.elastic) {
          sliderRef.current.style.transition = 'transform 700ms ease-out';
          sliderRef.current.style.transform = `translate(${
            mousePos.current.distance * delta
          }px)`;
        }
      }
    };

    const handleDragEnd = () => {
      setMouseDown(false);
      setCursor('auto');
      if (sliderRef.current) {
        if (mousePos.current.elastic) {
          sliderRef.current.style.transition = 'transform 300ms';
          sliderRef.current.style.transform = 'translate(0px)';
        }
      }
    };

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  });

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
