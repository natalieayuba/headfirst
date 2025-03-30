'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Dropdown from './FilterDropdown';
import Button from '../../../components/buttons/Button';
import { getMaxPrice } from '@/utils/formatting';
import { type EventProps, type TicketProps } from '../../../../db/schema';
import Slider from '@mui/material/Slider';
import { colors } from '../../../../../config';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const PriceDropdown = ({ events }: { events: EventProps[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const min = 0;
  const minDistance = 5;
  const max = () => {
    const allTickets: TicketProps[] = [];
    events.forEach((event) => allTickets.push(...event.tickets));
    return getMaxPrice(allTickets);
  };

  const [price, setPrice] = useState<number[]>(
    searchParams.has('priceFrom')
      ? [
          searchParams.get('priceFrom')?.toString(),
          searchParams.get('priceTo')?.toString(),
        ]
      : [min, max()]
  );

  const formatPrice = (priceArr: (number | string)[]) => `${
    priceArr[0].toString() === min.toString() ? 'Free' : `£${priceArr[0]}`
  } -
  ${
    priceArr[1].toString() === max().toString()
      ? 'any amount'
      : `£${priceArr[1]}`
  }`;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('priceFrom', price[0].toString());
    params.set('priceTo', price[1].toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.has('priceFrom')) {
      const getMax = () => {
        const allTickets: TicketProps[] = [];
        events.forEach((event) => allTickets.push(...event.tickets));
        return getMaxPrice(allTickets);
      };
      setPrice([min, getMax()]);
    }
  }, [searchParams, events]);

  return (
    <Suspense>
      <Dropdown
        title='Price'
        icon='pound'
        selected={
          searchParams.has('priceFrom')
            ? `${formatPrice([
                searchParams.get('priceFrom')!,
                searchParams.get('priceTo')!,
              ])}`
            : ''
        }
      >
        <Slider
          value={price}
          min={min}
          max={max()}
          onChange={handleChange}
          valueLabelDisplay='off'
          disableSwap
          id='slider'
          sx={{
            color: colors.lilac,
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: 'none',
              },
              '&.Mui-active': {
                boxShadow: 'none',
              },
            },
          }}
        />
        <Button
          type='secondary'
          className='w-full flex-col [&&]:h-fit p-3'
          onClick={handleClick}
          disabled={price[0] === min && price[1] === max()}
        >
          Show prices between
          <output htmlFor='slider' className='block text-xl'>
            {formatPrice(price)}
          </output>
        </Button>
      </Dropdown>
    </Suspense>
  );
};

export default PriceDropdown;
