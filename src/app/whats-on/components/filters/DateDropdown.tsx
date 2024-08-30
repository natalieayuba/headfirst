'use client';
import React, { useEffect, useState } from 'react';
import Dropdown from './FilterDropdown';
import Calendar from 'react-calendar';
import { formatDate, formatDateParam } from '@/utils/formatting';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/app/components/Icon';
import useLoader from '@/hooks/useLoader';
import Loader from '@/app/components/Loader';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateDropdown = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { loading, loadPage } = useLoader();

  const minDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Value>(
    searchParams.has('date')
      ? new Date(searchParams.get('date')?.toString()!)
      : null
  );
  const [activeStartDate, setActiveStartDate] = useState<Date>(minDate);

  const onChange = (value: Value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('date', formatDateParam(value as Date));
    } else {
      params.delete('date');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (searchParams.has('date')) {
      setSelectedDate(new Date(searchParams.get('date')?.toString()!));
    } else {
      setSelectedDate(null);
    }
  }, [searchParams]);

  const disabled = (date: Date) =>
    new Date(date.toDateString()) < new Date(minDate.toDateString());

  const notInMonth = (date: Date, activeStartDate: Date) =>
    date.getMonth() !== activeStartDate.getMonth();

  const isSelectedDate = (date: Date) =>
    date.toDateString() === (selectedDate as Date)?.toDateString();

  const isToday = (date: Date) =>
    date.toDateString() === minDate.toDateString();

  const prevLabel = (
    <Icon
      name='angle-left'
      className={`hover:opacity-70 duration-150 transition-opacity ${
        activeStartDate?.getMonth() === minDate.getMonth() &&
        activeStartDate.getFullYear() === minDate.getFullYear()
          ? ' invisible'
          : ''
      }`}
    />
  );

  const nextLabel = (
    <Icon
      name='angle-right'
      className='hover:opacity-70 duration-150 transition-opacity'
    />
  );

  return (
    <>
      {loading && <Loader />}
      <Dropdown
        title='Date'
        icon='calendar'
        selected={
          selectedDate ? formatDate((selectedDate as Date).toDateString()) : ''
        }
      >
        <Calendar
          onChange={(e) => loadPage(() => onChange(e))}
          value={selectedDate}
          next2Label={null}
          prev2Label={null}
          minDate={minDate}
          nextLabel={nextLabel}
          prevLabel={prevLabel}
          minDetail='month'
          tileClassName={({ date, activeStartDate }) =>
            `${
              disabled(date)
                ? 'opacity-30 '
                : notInMonth(date, activeStartDate)
                ? 'opacity-30 hover:bg-lilac hover:bg-opacity-30 '
                : isSelectedDate(date)
                ? 'bg-lilac text-dark-night font-medium '
                : isToday(date)
                ? 'border-2 border-lilac hover:bg-lilac hover:bg-opacity-30 '
                : 'hover:bg-lilac hover:bg-opacity-30 '
            }rounded-full aspect-square`
          }
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => {
            setActiveStartDate(activeStartDate as Date);
          }}
        />
      </Dropdown>
    </>
  );
};

export default DateDropdown;
