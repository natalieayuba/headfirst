import React from 'react';
import Banner from '@/components/Banner';
import PopularCategories from '@/components/PopularCategories';
import EditorPicks from '@/components/EditorPicks';

const Home = () => {
  return (
    <main>
      <Banner />
      <PopularCategories />
      <EditorPicks />
    </main>
  );
};

export default Home;
