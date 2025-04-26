export interface VenueProps {
  id: string;
  name: string;
  address: string;
  googleMapsLink: string;
  image?: string;
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
  spotify?: string;
  bandcamp?: string;
}

export interface MediaProps {
  src: string;
  alt?: string;
}

export interface PromoterProps {
  id: string;
  name: string;
  avatar?: string;
}

export interface EventProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  venueId: string;
  categoryId: string;
  promoterId: string;
  subcategoryIds: string[];
  about: string;
  credit: string;
  saved: boolean;
  tickets: TicketProps[];
  ageLimit?: number;
  lastEntry?: string;
  media: MediaProps[];
  socials?: SocialsProps;
  editorsPick?: boolean;
}
