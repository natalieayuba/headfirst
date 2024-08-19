import React from 'react';
import Banner from '@/components/Banner';
import PopularCategories from '@/components/PopularCategories';
import EditorPicks from '@/components/EditorPicks';
import Donations from '@/components/Donations';
import AppAd from '@/components/AppAd';

const Home = () => {
  return (
    <main>
      <Banner />
      <PopularCategories />
      <EditorPicks />
      <Donations />
      <AppAd />
    </main>
  );
};

export default Home;
