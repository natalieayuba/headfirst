import useLocalStorage from '@/hooks/useLocalStorage';
import React, { useEffect, useRef, useState } from 'react';

interface Slot {
  div: HTMLDivElement | null;
  spans: (HTMLSpanElement | null)[];
}

const SlotMachine = () => {
  const [donations, setDonations] = useState(12477.5); // useLocalStorage('donations', 12477.5);
  const donationsStr = String(donations.toFixed(2));
  const slotRefs = useRef<Slot[]>(
    Array(donationsStr.replace('.', '').length).fill({
      div: null,
      spans: Array(10),
    })
  );

  useEffect(() => {
    Array.from(donationsStr.replace('.', '')).forEach((n, i) => {
      if (slotRefs.current) {
        const slotSlider = slotRefs.current[i];
        const number = slotSlider.spans.find((span) => span?.innerText === n);
        console.log(number?.innerText);
        if (slotRefs.current[i].div && number) {
          slotRefs.current[i].div.scrollTo({ top: number.offsetTop });
        }
      }
    });
  }, [donationsStr]);

  const renderSlot = (char: string, index: number) => (
    <div
      key={`${char}${index}`}
      className={`inline-flex justify-center ${char.match(/\W/) ? '' : 'w-9'}`}
    >
      {char.match(/\W/) ? (
        char
      ) : (
        <div
          ref={(el) => {
            if (slotRefs.current[index]) {
              slotRefs.current[index].div = el;
            }
          }}
          className='overflow-hidden leading-[44px] h-11 relative scroll-smooth snap-y snap-mandatory'
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className='block snap-start'
              ref={(el) => {
                if (slotRefs.current[index]) {
                  slotRefs.current[index].spans[i] = el;
                }
              }}
            >
              {i}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className='font-heading-lg text-6xl font-bold'>
      <div className='font-sans font-extrabold text-3xl inline-flex'>£</div>
      {Array.from(donationsStr).map(renderSlot)}
    </div>
  );
};

export default SlotMachine;
