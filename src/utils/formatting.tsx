import type { TicketProps } from '@/db/schema';

export const appendClassName = (className: string | undefined) =>
  className ? ` ${className}` : '';

export const toUrl = (heading: string) =>
  heading
    .toLowerCase()
    .replace('/', ' ')
    .replace('&', 'and')
    .replace(/ /g, '-');

export const dateFormat = (date: string) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(date));

export const timeFormat = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(date));

export const formatDate = (date: string, withTime?: boolean) =>
  `${dateFormat(date)}${withTime ? `, ${timeFormat(date)}` : ''}`;

export const formatDateRange = (start: string, end: string) =>
  `${formatDate(start, true)} - ${
    new Date(start).getDate() === new Date(end).getDate()
      ? timeFormat(end)
      : formatDate(end, true)
  }`;

export const getMinPrice = (list: any[]) =>
  list.reduce((a, b) => (a.price < b.price ? a : b)).price;

export const getMaxPrice = (list: any[]) =>
  list.reduce((a, b) => (a.price > b.price ? a : b)).price;

export const formatPrice = (price: number) =>
  `£${price % 1 !== 0 ? price.toFixed(2) : price}`;

export const formatPriceRange = (tickets: TicketProps[]) => {
  const toString = (price: number) =>
    price === 0 ? 'Free' : formatPrice(price);

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

export const toSentenceCase = (text: string) =>
  text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const formatEventUrl = (id: string, name: string) =>
  toUrl(`${name}-${id}`);

export const formatDateParam = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${yyyy}-${pad(mm)}-${pad(dd)}`;
};
