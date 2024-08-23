import { categories, venues, type EventProps } from './data';

export const getCategoryById = (id: string) =>
  categories.find((category) => category.id === id);

export const getVenueById = (id: string) =>
  venues.find((venue) => venue.id === id);

export const getSubcategoryById = (categoryId: string, subcategoryId: string) =>
  getCategoryById(categoryId)?.subcategories.find(
    ({ id }) => subcategoryId === id
  );
