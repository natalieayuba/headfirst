import React from 'react';
import HomeSection from './HomeSection';
import HorizontalScroll from '../HorizontalScroll';
import { events, sortDateAsc } from '../../data/data';
import EventCard from '../EventCard';
import type { EventProps } from '../EventProps';

const EditorPicks = () => {
  const card = (item: EventProps) => <EventCard event={item} />;

  const editorsPicks = events
    .sort(() => 0.5 - Math.random())
    .slice(0, 10)
    .sort(sortDateAsc);

  return (
    <HomeSection
      heading="Our editor's top picks just for you"
      caption='Explore the best gigs and nights out in Bristol, curated by our editorial team.'
    >
      <HorizontalScroll list={editorsPicks} card={card} />
    </HomeSection>
  );
};

export default EditorPicks;
