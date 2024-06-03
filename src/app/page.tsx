import React from 'react';
import Banner from '@/components/Banner';
import PopularEvents from '@/components/PopularEvents';
import PromoterCTA from '@/components/PromoterCTA';

const Home = () => {
  return (
    <>
      <Banner />
      <PopularEvents />
      <PromoterCTA />
    </>
  );
};

export default Home;
