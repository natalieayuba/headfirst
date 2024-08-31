import React from 'react';
import Banner from '@/app/components/home/Banner';
import PopularCategories from '@/app/components/home/PopularCategories';
import EditorPicks from '@/app/components/home/EditorPicks';
import Donations from '@/app/components/home/Donations';
import AppAd from '@/app/components/home/AppAd';
import Header from './components/Header';
import Search from './components/search/Search';

const Home = () => (
  <>
    <Header search={<Search />} />
    <main>
      <Banner />
      <PopularCategories />
      <EditorPicks />
      <Donations />
      <AppAd />
    </main>
  </>
);

export default Home;
