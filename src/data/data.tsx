import eventsJson from './events.json';
import categoriesJson from './categories.json';
import venuesJson from './venues.json';

export interface VenueProps {
  id: number;
  name: string;
  address: string;
  googleMapsLink: string;
}

export interface CategoryProps {
  id: number;
  name: string;
  image: string;
  subcategories: string[];
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
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  venueId: number;
  categoryId: number;
  subcategoryIds: number[];
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

// const randomEventsGenerator = () => {
//   const events = [];

//   const adjectives = [
//     'great',
//     'wonderful',
//     'fun',
//     'fantastic',
//     'wicked',
//     'awesome',
//     'killer',
//     'outstanding',
//     'once-in-a-lifetime',
//     'thrilling',
//     'festive',
//     'unforgettable',
//     'spectacular',
//     'electrifying',
//     'chill',
//     'fun-filled',
//   ];

//   const flickrCategories = [
//     'abstract',
//     'business',
//     'nightlife',
//     'fashion',
//     'people',
//     'technics',
//   ];

//   const ageLimits = [14, 15, 18, 25];
//   const startTimes = ['17:00', '17:30', '18:00', '18:15'];
//   // pick a time between 5 and 11 and make sure it is a 15, 30 or 00.
//   // durations between 1 to 5 hours

//   const randomDate = (
//     start: Date,
//     end: Date,
//     startHour: number,
//     endHour: number
//   ) => {
//     const date = new Date(+start + Math.random() * (+end - +start));
//     const hour = (startHour + Math.random() * (endHour - startHour)) | 0;
//     date.setHours(hour);
//     date.setMinutes((Math.round(date.getMinutes() / 30) * 30) % 60);
//     date.setSeconds(0);
//     return date;
//   };

//   const addMonths = (date: Date, months: number) => {
//     const d = new Date(date);
//     d.setMonth(d.getMonth() + months);
//     return d;
//   };

//   const getMedianHour = (hours: number[]) => {
//     hours = [...hours].sort((a, b) => a - b);
//     const half = Math.floor(hours.length / 2);
//     return hours.length % 2 ? hours[half] : (hours[half - 1] + hours[half]) / 2;
//   };

//   const today = new Date();
//   const sixMonthsFromToday = addMonths(today, 6);

//   for (let i = 0; i < 100; i++) {
//     let event = {} as EventProps;
//     const flickrCategory =
//       flickrCategories[Math.floor(Math.random() * flickrCategories.length)];
//     event.name = 'Lorem ipsum';
//     event.startDate = randomDate(today, sixMonthsFromToday, 17, 23);
//     event.endDate = new Date(event.startDate);
//     event.endDate.setHours(
//       event.endDate.getHours() + Math.floor(Math.random() * 5)
//     );
//     event.venueId = Math.floor(Math.random() * venues.length);
//     event.categoryId = Math.floor(Math.random() * categories.length);
//     event.subcategories = [
//       ...new Set(
//         Array.from({ length: 5 }, () => Math.floor(Math.random() * 5))
//       ),
//     ];
//     event.about = `${event.name} is a ${
//       adjectives[Math.floor(Math.random() * adjectives.length)]
//     } ${categories[
//       event.categoryId
//     ].name.toLowerCase()} event that you cannot miss.`;
//     event.image = faker.image.urlLoremFlickr({ category: flickrCategory });
//     event.saved = Math.random() < 0.08;
//     event.tickets = [
//       {
//         name: 'General release',
//         price: Math.floor(Math.random() * (10 - 6 + 1)) + 6,
//         limit: 50,
//       },
//     ];

//     if (i % 5 === 0) {
//       event.tickets.push({
//         name: 'Final release',
//         price: Math.ceil((event.tickets[0].price + 5) / 5) * 5,
//         limit: 10,
//       });
//       for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
//         event.media?.push(
//           faker.image.urlLoremFlickr({ category: flickrCategory })
//         );
//       }
//     }

//     if (i % 10 === 0) {
//       event.ageLimit = ageLimits[Math.floor(Math.random() * ageLimits.length)];
//     }

//     // not working correctly
//     if (i % 15 === 0) {
//       event.lastEntry = new Date(event.startDate);
//       event.lastEntry.setHours(
//         getMedianHour([event.startDate.getHours(), event.endDate.getHours()])
//       );
//     }

//     events.push(event);
//   }
//   return events;
// };

// export const events: EventProps[] = randomEventsGenerator().sort(sortDateAsc);

// console.log(events);
