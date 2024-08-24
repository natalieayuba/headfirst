import type { TicketProps } from '@/data/data';

export const appendClassName = (className: string | undefined) =>
  className ? ` ${className}` : '';

export const toUrl = (heading: string) =>
  heading.toLowerCase().replace('&', 'and').replace(/ /g, '-');

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

export const formatEventUrl = (id: string, name: string) =>
  toUrl(`${name}-${id}`);
