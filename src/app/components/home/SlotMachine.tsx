import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../buttons/Button';

const SlotMachine = () => {
  const [donation, setDonation] = useState(14177.5);

  const formattedDonation = () => {
    let pound = '0';
    let pence = '0';
    let tmpNums = '';

    if (donation % 1 !== 0) {
      const decimalNumber = String(donation.toFixed(2)).split('.');
      (pound = decimalNumber[0]), (pence = decimalNumber[1]);
    } else {
      pound = String(donation);
    }

    tmpNums += pound;
    tmpNums += pence.length === 1 ? pence.padStart(2, '0') : pence;
    return [...tmpNums].map(Number);
  };

  const [numbers, setNumbers] = useState<number[]>(formattedDonation());
  const ref = useRef<(HTMLDivElement | null)[]>([]);
  const slots = new Array(formattedDonation().length).fill([
    ...Array(10).keys(),
  ]);

  const handleClick = () => {
    if (donation) {
      setDonation(Math.round((donation + 0.01) * 100) / 100);
      setNumbers(formattedDonation());
    }
  };

  const decimalPosition = (array: number[]) => array.length - 2;
  const isCommaPosition = (index: number, array: number[]) =>
    (decimalPosition(array) - index) % 3 === 0 &&
    index > 0 &&
    index < decimalPosition(array);

  useEffect(() => {
    if (ref.current) {
      ref.current.forEach((div, index) => {
        if (div) {
          const span = Array.from(div.children).find((child) =>
            child.textContent?.includes(String(numbers[index]))
          ) as HTMLElement;
          ref.current[index]!.scrollTop = span.offsetTop + 10;
          console.log(ref.current[index]!.scrollTop);
        }
      });
    }
  }, [numbers]);

  return (
    <div>
      <p className='text-7xl font-bold flex items-end'>
        <span className='flex items-end relative top-3'>
          £
          {slots.map((col, index) => {
            return (
              <>
                {isCommaPosition(index, slots) && <span>,</span>}
                {index === decimalPosition(slots) && <span>.</span>}
                <div
                  ref={(el) => (ref.current[index] = el as any)}
                  className='inline-flex flex-col-reverse h-12 relative mb-4 overflow-hidden snap-mandatory scroll-smooth'
                >
                  {col.map((n: number) => (
                    <span
                      key={n}
                      className='w-11 flex-1 flex items-center justify-center text-center relative snap-center -mb-3.5'
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </>
            );
          })}
        </span>
      </p>
      <Button onClick={handleClick}>add 1p</Button>
    </div>
  );
};

export default SlotMachine;
