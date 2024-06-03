import type { EventProps } from './EventProps';

export const events: EventProps[] = [
  {
    id: '36283',
    title: 'Bluetooth Bangers: All Chase No Status - DNB Classics',
    description: `The notorious Bluetooth Bangers returns for a fully loaded DnB classics *FREE RAVE!

    Join us at Lakota for a night of drum and bass classics tracks from our very own Lakota residents, showcasing legendary throwbacks from the likes of Chase and Status, High Contrast, Pendulum, Danny Byrd, Brookes Brothers and more!
    
    This night will truly take us down memory lane through the back catalogues of some of the most revered artists that helped shape our beloved DnB scene today.
    
    Highly anticipating a roadblock for this one. So grab yourself a free ticket now!
     
    *Due to huge demand for these shows, you'll just need to register to snap up free tickets (valid until 11pm). Alternatively, you can purchase a ticket to guarantee entry for £5+ that will allow you to enter later than 11pm.`,
    startDate: '06-07-2024 22:00',
    endDate: '08-06-2024 03:00',
    venue: {
      name: 'Lakota',
      address: '6 Upper York St, Bristol BS2 8QN, UK',
      map: '',
    },
    categories: ['DJ'],
    host: 'DJ man',
    tickets: [
      {
        name: 'Standard',
        price: 6.99,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos fugiat nostrum soluta ullam impedit, amet alias temporibus asperiores provident doloribus ipsa voluptatum at dolorum est dolor corporis ratione excepturi libero.',
        total: 10,
      },
      {
        name: 'Latecomers',
        price: 8.99,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos fugiat nostrum soluta ullam impedit, amet alias temporibus asperiores provident doloribus ipsa voluptatum at dolorum est dolor corporis ratione excepturi libero.',
        total: 10,
      },
    ],
    ageLimit: 18,
    images: [
      'https://dice-media.imgix.net/attachments/2024-05-27/0a20fc88-3d46-43a3-a7de-f6c88262c13a.jpg?rect=342%2C0%2C1365%2C1365&auto=format%2Ccompress&q=40&w=328&fit=max&dpr=2',
    ],
  },
];
