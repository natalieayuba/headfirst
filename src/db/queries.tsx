'use server';
import type { CategoryProps, EventProps, VenueProps } from './schema';

const baseUrl = 'http://localhost:3030';

export const getCategories = async () => {
  const data = await fetch(`${baseUrl}/categories`);
  return (await data.json()) as CategoryProps[];
};

export const getVenues = async () => {
  const data = await fetch(`${baseUrl}/venues`);
  return (await data.json()) as VenueProps[];
};

export const getEvents = async () => {
  const data = await fetch(`${baseUrl}/events`);
  const events = (await data.json()) as EventProps[];

  const diff =
    Math.ceil(+new Date() - +new Date(events[0].startDate)) /
      (1000 * 60 * 60 * 24) +
    1;

  events.forEach((event) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    startDate.setDate(startDate.getDate() + diff);
    endDate.setDate(endDate.getDate() + diff);
    event.startDate = startDate.toISOString();
    event.endDate = endDate.toISOString();

    if (event.lastEntry) {
      const lastEntry = new Date(event.lastEntry);
      lastEntry.setDate(lastEntry.getDate() + diff);
      event.lastEntry = lastEntry.toISOString();
    }

    return event;
  });

  events.sort((a: EventProps, b: EventProps) =>
    a.startDate.localeCompare(b.startDate)
  );

  return events;
};
