module.exports = {
  name: 'Headfirst Bristol',
  tagline: 'Find the Bristol scene that fits',
  description:
    "Discover local gigs, club nights, and social events from Bristol's biggest promoters.",
  colors: {
    lilac: '#BA9CFF',
    night: '#1E1B28',
    'dark-night': '#0E0C12',
  },
  navLinks: [
    {
      name: 'Browse events',
      url: '/whats-on',
    },
    {
      name: 'About',
    },
    {
      name: 'Donations',
    },
    {
      name: 'Help',
    },
    {
      name: 'My account',
      links: [
        {
          name: 'Tickets',
        },
        {
          name: 'Saved',
        },
        {
          name: 'Settings',
        },
        {
          name: 'Sign out',
        },
      ],
    },
  ],
  animationDurations: {
    banner: 500,
    default: 200,
  },
};
