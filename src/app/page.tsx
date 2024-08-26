import React from 'react';
import Banner from '@/app/components/home/Banner';
import PopularCategories from '@/app/components/home/PopularCategories';
import EditorPicks from '@/app/components/home/EditorPicks';
import Donations from '@/app/components/home/Donations';
import AppAd from '@/app/components/home/AppAd';

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
