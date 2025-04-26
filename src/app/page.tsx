import React from 'react';
import Banner from '@/app/components/home/Banner';
import Categories from '@/app/components/home/Categories';
import EditorPicks from '@/app/components/home/EditorPicks';
import Donations from '@/app/components/home/Donations/Donations';
import Promoters from '@/app/components/home/Promoters';
import { getCategories, getEvents, getVenues } from '@/db/queries';
import Main from './components/Main';
import MobileAppPromo from './components/home/MobileAppPromo';
import Venues from './components/home/Venues';

const Home = async () => {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();

  return (
    <Main className='[&&]:pt-0 pb-20 flex flex-col gap-24'>
      <Banner />
      <Categories {...{ categories }} />
      <EditorPicks {...{ events, venues }} />
      <MobileAppPromo />
      <Venues {...{ venues }} />
      <Donations />
      <Promoters />
    </Main>
  );
};

export default Home;
