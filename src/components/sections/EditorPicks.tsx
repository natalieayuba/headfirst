import React from 'react';
import HomeSection from './HomeSection';
import HorizontalScroll from '../HorizontalScroll';
import { events, sortDateAsc } from '../../data/data';
import EventCard from '../EventCard';

const EditorPicks = () => {
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
