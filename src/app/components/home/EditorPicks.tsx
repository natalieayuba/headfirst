import React from 'react';
import HomeSection from './HomeSection';
import HorizontalScroll from '../HorizontalScroll';
import EventCard from '../EventCard';
import { getEvents, getVenues, sortDateAsc } from '@/utils/db';

const EditorPicks = async () => {
  const events = await getEvents();
  const venues = await getVenues();

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
        card={(event) => (
          <EventCard
            venues={venues}
            event={event}
            showTime={false}
            showPrice={false}
            cardSize='w-36'
          />
        )}
      />
    </HomeSection>
  );
};

export default EditorPicks;
