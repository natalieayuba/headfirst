import useElementVisible from '@/hooks/useElementVisible';
import React, { useEffect, useRef, useState, type RefObject } from 'react';

const SlotMachine = () => {
  const [amount, setAmount] = useState(14177.5);
  const [height, setHeight] = useState(0);
  const { visible, observedRef } = useElementVisible();

  const formattedDonation = () => {
    let pound = '0';
    let pence = '0';
    let tmpNums = '';

    if (amount % 1 !== 0) {
      const decimalNumber = String(amount.toFixed(2)).split('.');
      (pound = decimalNumber[0]), (pence = decimalNumber[1]);
    } else {
      pound = String(amount);
    }

    tmpNums += pound;
    tmpNums += pence.length === 1 ? pence.padStart(2, '0') : pence;
    return [...tmpNums].map(Number);
  };

  const [numbers, setNumbers] = useState<number[]>(formattedDonation());
  const ref = useRef<(HTMLSpanElement | null)[]>([]);
  const slots = new Array(formattedDonation().length).fill([
    ...Array(10).keys(),
  ]);

  useEffect(() => {
    const addToDonation = () => {
      if (amount) {
        setAmount(Math.round((amount + 0.79) * 100) / 100);
        setNumbers(formattedDonation());
      }
    };
    const interval = setInterval(() => {
      addToDonation();
    }, 300000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (ref.current) {
      const span = ref.current[0]?.children[0] as HTMLElement;
      setHeight(span.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (ref.current && visible) {
      ref.current.forEach((div, index) => {
        if (div) {
          const span = Array.from(div.children).find((child) =>
            child.textContent?.includes(String(numbers[index]))
          ) as HTMLSpanElement;
          ref.current[index]!.scrollTo({ top: span.offsetTop });
        }
      });
    }
  }, [numbers, visible]);

  const decimalPosition = (array: number[]) => array.length - 2;
  const isCommaPosition = (index: number, array: number[]) =>
    (decimalPosition(array) - index) % 3 === 0 &&
    index > 0 &&
    index < decimalPosition(array);

  return (
    <div ref={observedRef as RefObject<HTMLDivElement>}>
      <p className='font-heading-lg text-6xl font-bold text-lilac flex items-end'>
        <span className='font-sans font-extrabold text-3xl mr-px mb-px'>£</span>
        {slots.map((col, index, array) => {
          return (
            <React.Fragment key={index}>
              {isCommaPosition(index, array) && <span>,</span>}
              {index === decimalPosition(array) && <span>.</span>}
              <span
                ref={(el) => (ref.current[index] = el as any)}
                className='inline-flex flex-col-reverse relative overflow-hidden snap-mandatory scroll-smooth'
                style={{ height }}
              >
                {col.map((n: number) => (
                  <span key={n} className='inline-block text-center'>
                    {n}
                  </span>
                ))}
              </span>
            </React.Fragment>
          );
        })}
      </p>
    </div>
  );
};

export default SlotMachine;
