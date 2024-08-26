import type { CategoryProps, EventProps, VenueProps } from './data';

export const getCategories = async () => {
  const data = await fetch('http://localhost:3030/categories');
  return (await data.json()) as CategoryProps[];
};

export const getVenues = async () => {
  const data = await fetch('http://localhost:3030/venues');
  return (await data.json()) as VenueProps[];
};

export const getEvents = async () => {
  const data = await fetch('http://localhost:3030/events');
  return (await data.json()) as EventProps[];
};
