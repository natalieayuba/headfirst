import React from 'react';
import Banner from '@/app/components/home/Banner';
import Categories from '@/app/components/home/Categories';
import EditorPicks from '@/app/components/home/EditorPicks';
import Donations from '@/app/components/home/Donations';
import AppAd from '@/app/components/home/AppAd';
import Header from './components/Header';
import Search from './components/search/Search';
import { getCategories, getEvents, getVenues } from '@/db/queries';

const Home = async () => {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();

  return (
    <>
      <Header search={<Search />} />
      <main>
        <Banner />
        <Categories categories={categories} />
        <EditorPicks events={events} venues={venues} />
        <Donations />
        <AppAd />
      </main>
    </>
  );
};

export default Home;
