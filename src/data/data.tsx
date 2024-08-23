import eventsJson from './events.json';
import categoriesJson from './categories.json';
import venuesJson from './venues.json';

export interface VenueProps {
  id: string;
  name: string;
  address: string;
  googleMapsLink: string;
}

export interface CategoryProps {
  id: string;
  name: string;
  image: string;
  subcategories: SubcategoryProps[];
}

export interface SubcategoryProps {
  id: string;
  name: string;
}

export interface TicketProps {
  name: string;
  price: number;
}

export interface SocialsProps {
  instagram?: string;
  facebook?: string;
  spotify?: string;
  bandcamp?: string;
}
export interface MediaProps {
  src: string;
  alt: string;
}

export interface EventProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  venueId: string;
  categoryId: string;
  subcategoryIds: string[];
  about: string;
  credit: string;
  image: string;
  saved: boolean;
  tickets: TicketProps[];
  ageLimit?: number;
  lastEntry?: string;
  media?: MediaProps[];
  socials?: SocialsProps;
}

export const categories: CategoryProps[] = Object.values(categoriesJson);
export const venues: VenueProps[] = Object.values(venuesJson);
export const sortDateAsc = (a: EventProps, b: EventProps) =>
  +new Date(a.startDate) - +new Date(b.startDate);
export const events: EventProps[] = Object.values(eventsJson).sort(sortDateAsc);
