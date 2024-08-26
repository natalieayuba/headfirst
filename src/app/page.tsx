import React from 'react';
import Banner from '@/components/sections/Banner';
import PopularCategories from '@/components/sections/PopularCategories';
import EditorPicks from '@/components/sections/EditorPicks';
import Donations from '@/components/sections/Donations';
import AppAd from '@/components/sections/AppAd';

const Home = () => (
  <>
    <Banner />
    <PopularCategories />
    <EditorPicks />
    <Donations />
    <AppAd />
  </>
);

export default Home;
