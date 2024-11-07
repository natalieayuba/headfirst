module.exports = {
  name: 'Headfirst Bristol',
  tagline: 'Find the Bristol scene that fits',
  description:
    "Discover local gigs, club nights, and social events from Bristol's biggest promoters.",
  colors: {
    lilac: '#BA9CFF',
    night: '#1E1B28',
    'dark-night': '#0E0C12',
    white: '#fff',
    transparent: 'transparent',
  },
  navLinks: {
    browse: [
      {
        text: "What's on",
        url: '/whats-on',
      },
      {
        text: 'Venues',
      },
    ],
    user: [
      {
        text: 'Ticket your event',
      },
      {
        text: 'My account',
        links: [],
      },
    ],
  },
  animationDurations: {
    banner: 500,
    default: 200,
  },
};
