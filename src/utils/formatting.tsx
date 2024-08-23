import type { TicketProps } from '@/components/database';
import moment from 'moment';

export const appendClassName = (className: string | undefined) =>
  className ? ` ${className}` : '';

export const toUrl = (heading: string) =>
  heading.toLowerCase().replace('&', 'and').replace(/ /g, '-');

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
};

const timeOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export const formatDate = (date: string, withTime?: boolean) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(
    new Date(date)
  );
  const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(
    new Date(date)
  );
  return `${formattedDate}${withTime ? `, ${formattedTime}` : ''}`;
};

export const formatDateRange = (start: Date, end: Date) =>
  `${formatDate(start, true)} - ${
    start.getDate() === end.getDate()
      ? moment(end).format(timeFormat)
      : formatDate(end, true)
  }`;

export const getMinPrice = (list: any[]) =>
  list.reduce((a, b) => (a.price < b.price ? a : b)).price;

export const getMaxPrice = (list: any[]) =>
  list.reduce((a, b) => (a.price > b.price ? a : b)).price;

export const formatPrice = (tickets: TicketProps[]) => {
  const toString = (price: number) =>
    price === 0
      ? 'Free'
      : `£${
          price % 1 !== 0
            ? price.toLocaleString('en', { minimumFractionDigits: 2 })
            : price
        }`;

  if (
    tickets.length === 1 ||
    tickets.every((ticket) => ticket.price === tickets[0].price)
  ) {
    return toString(tickets[0].price);
  }
  return `${toString(getMinPrice(tickets))} - ${toString(
    getMaxPrice(tickets)
  )}`;
};

export const capitaliseFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);
