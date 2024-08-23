module.exports = {
  name: 'Headfirst Bristol',
  tagline: 'Find the Bristol scene that fits.',
  description:
    "Discover local gigs, club nights, and social events from Bristol's biggest promoters.",
  images: {
    banner:
      'https://images.unsplash.com/photo-1635216615320-68906b26443b?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  colors: {
    lilac: '#BA9CFF',
    night: '#1E1B28',
    'dark-night': '#0E0C12',
    'white-alpha-90': 'rgba(255,255,255,0.9)',
    'white-alpha-60': 'rgba(255,255,255,0.6)',
  },
  navLinks: [
    {
      name: 'Browse events',
      url: '/whats-on',
    },
    {
      name: 'About',
      url: '#',
    },
    {
      name: 'Donations',
      url: '#',
    },
    {
      name: 'Help',
      url: '#',
    },
    {
      name: 'My account',
      links: [
        {
          name: 'Tickets',
          url: '#',
        },
        {
          name: 'Saved',
          url: '#',
        },
        {
          name: 'Settings',
          url: '#',
        },
        {
          name: 'Sign out',
          url: '#',
        },
      ],
    },
  ],
  animationDurations: {
    banner: 500,
    default: 200,
  },
};
