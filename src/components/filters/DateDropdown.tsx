import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import Calendar from 'react-calendar';
import { formatDate } from '@/utils/formatting';
import type { FilterProps } from '@/app/whats-on/page';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateDropdown = ({ filter }: FilterProps) => {
  const [date, setDate] = useState<Value>();

  const onChange = (value: Value) => {
    setDate(value);
    filter('date', value);
  };

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
