import React from 'react';
import HomeSection from './HomeSection';
import HorizontalScroll from '../HorizontalScroll';
import { sortDateAsc } from '../../../data/data';
import EventCard from '../EventCard';

const EditorPicks = async () => {
  let data = await fetch('http://localhost:3030/events');
  let events = await data.json();

  // how would editorsPicks be stored? its own db? much to think about...
  const editorsPicks = events
    .sort(() => 0.5 - Math.random())
    .slice(0, 10)
    .sort(sortDateAsc);

  return (
    <HomeSection
      heading="Our editor's top picks just for you"
      caption='Explore the best gigs and nights out in Bristol, curated by our editorial team.'
    >
      <HorizontalScroll
        list={editorsPicks}
        card={(event) => <EventCard event={event} />}
      />
    </HomeSection>
  );
};

export default EditorPicks;
