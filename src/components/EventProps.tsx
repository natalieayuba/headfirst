import type { ReactNode } from 'react';

export interface EventProps {
  id: string;
  title: string;
  description: ReactNode;
  startDate: string;
  endDate: string;
  saved?: boolean;
  venue: {
    name: string;
    address: string;
    map?: string;
  };
  categories: string[];
  host: string;
  tickets: {
    name: string;
    price: number;
    description: string;
    total: number;
  }[];
  ageLimit: number;
  tags?: string[];
  images: string[];
  externalLinks?: {
    youtube: {
      title: string;
      url: string;
    }[];
    spotify: {
      artist: string;
      song: string;
      url: string;
    };
  };
}
