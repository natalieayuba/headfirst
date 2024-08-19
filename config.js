module.exports = {
  name: 'Headfirst Bristol',
  tagline: 'Find the Bristol scene that fits.',
  description:
    "Discover local gigs, club nights, and social events from Bristol's biggest promoters.",
  images: {
    banner:
      'https://images.unsplash.com/photo-1635216615320-68906b26443b?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  videos: [
    'https://videos.pexels.com/video-files/3209858/3209858-uhd_2560_1440_25fps.mp4',
    'https://videos.pexels.com/video-files/3345545/3345545-hd_1920_1080_25fps.mp4',
    'https://videos.pexels.com/video-files/4722098/4722098-uhd_2732_1440_25fps.mp4',
    'https://videos.pexels.com/video-files/4808409/4808409-uhd_2560_1440_24fps.mp4',
    'https://videos.pexels.com/video-files/5039537/5039537-uhd_2732_1440_25fps.mp4',
  ],
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
      url: '/events',
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
  categories: [
    {
      name: 'Live music',
      image:
        'https://images.unsplash.com/photo-1575672913784-11a7cd4f25f4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Club nights',
      image:
        'https://images.unsplash.com/photo-1626553202550-992f4f500d4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Arts & performance',
      image:
        'https://images.pexels.com/photos/3778868/pexels-photo-3778868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: 'Workshops & classes',
      image:
        'https://images.unsplash.com/photo-1526718583451-e88ebf774771?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Socials & hobbies',
      image:
        'https://images.pexels.com/photos/8111364/pexels-photo-8111364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ],
  animationDurations: {
    banner: 500,
    default: 200,
  },
};
