import React, { useEffect } from 'react';
import Banner from '@/app/components/home/Banner';
import Categories from '@/app/components/home/Categories';
import EditorPicks from '@/app/components/home/EditorPicks';
import Donations from '@/app/components/home/Donations';
import Promoters from '@/app/components/home/Promoters';
import { getCategories, getEvents, getVenues } from '@/db/queries';
import Main from './components/Main';

const Home = async () => {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();

  return (
    <Main className='[&&]:pt-0 pb-20 flex flex-col gap-24'>
      <Banner />
      <Categories categories={categories} />
      <EditorPicks events={events} venues={venues} />
      <Donations />
      <Promoters />
    </Main>
  );
};

export default Home;
