import React, { useEffect, useState } from 'react';
import Dropdown from '../Dropdown';
import Calendar from 'react-calendar';
import { formatDate } from '@/utils/formatting';
import type { AddFilterProps } from '@/app/whats-on/page';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateDropdown = ({ addFilter, clear }: AddFilterProps) => {
  const [date, setDate] = useState<Value>();

  const onChange = (value: Value) => {
    setDate(value);
    addFilter('date', value);
  };

  useEffect(() => {
    if (clear) {
      setDate(null);
    }
  }, [clear]);

  return (
    <Dropdown
      title='Date'
      icon='calendar'
      selected={date ? formatDate(date.toString()) : ''}
    >
      <Calendar onChange={onChange} value={date} />
    </Dropdown>
  );
};

export default DateDropdown;
