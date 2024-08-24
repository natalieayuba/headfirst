import React, { useEffect, useState } from 'react';
import Dropdown from '../Dropdown';
import { Button } from '../buttons/Button';
import type { AddFilterProps } from '@/app/whats-on/page';
import { getMaxPrice } from '@/utils/formatting';
import { events, type TicketProps } from '../../data/data';
import Slider from '@mui/material/Slider';
import { colors } from '../../../config';

const PriceDropdown = ({ addFilter, clear }: AddFilterProps) => {
  const min = 0;
  const max = () => {
    const allTickets: TicketProps[] = [];
    events.forEach((event) => allTickets.push(...event.tickets));
    return getMaxPrice(allTickets);
  };

  const minDistance = 5;

  const [price, setPrice] = useState<number[]>();
  const [tmpPrice, setTmpPrice] = useState<number[]>([min, max()]);

  const formatPrice = (priceArr: number[]) => `${
    priceArr[0] === min ? 'Free' : `£${priceArr[0]}`
  } -
  ${priceArr[1] === max() ? 'any amount' : `£${priceArr[1]}`}`;

  useEffect(() => {
    if (price && price.length > 0) {
      addFilter('price', price);
    }
  }, [price]);

  useEffect(() => {
    if (clear) {
      setPrice([]);
      setTmpPrice([min, max()]);
    }
  }, [clear]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setTmpPrice([
        Math.min(newValue[0], tmpPrice[1] - minDistance),
        tmpPrice[1],
      ]);
    } else {
      setTmpPrice([
        tmpPrice[0],
        Math.max(newValue[1], tmpPrice[0] + minDistance),
      ]);
    }
  };

  return (
    <Dropdown
      title='Price'
      icon='pound'
      selected={price && price.length > 0 ? formatPrice(price) : ''}
    >
      <Slider
        value={tmpPrice}
        min={min}
        max={max()}
        onChange={handleChange}
        valueLabelDisplay='off'
        disableSwap
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
      <Button alt className='w-full' onClick={() => setPrice(tmpPrice)}>
        Show prices between
        <span className='block text-xl leading-[105%]'>
          {formatPrice(tmpPrice)}
        </span>
      </Button>
    </Dropdown>
  );
};

export default PriceDropdown;
