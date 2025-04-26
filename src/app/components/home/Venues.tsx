import type { VenueProps } from '@/db/schema';
import React from 'react';
import ThumbnailCard from '../ThumbnailCard';
import HomeSectionTemplate from './HomeSectionTemplate';
import HorizontalScroll from '../HorizontalScroll';
import Hyperlink from '../Hyperlink';

const Venues = ({ venues }: { venues: VenueProps[] }) => (
  <HomeSectionTemplate
    heading="Explore Bristol's music scene"
    description={
      <>
        We partner with local independent venues to give you the most relevant
        and up-to-date <i>What&apos;s On in Bristol</i> guide you&apos;ll find.
      </>
    }
  >
    <HorizontalScroll
      className='md:grid md:grid-flow-col md:grid-cols-4 md:w-full'
      list={venues.slice(0, 5)}
      renderItem={(venue: VenueProps) => (
        <ThumbnailCard
          href='#'
          image={{
            src: venue.image as string,
            alt: `${venue.name} image`,
            ...(venue.name === 'Strange Brew' && { className: 'scale-[101%]' }),
          }}
        >
          {venue.name}
        </ThumbnailCard>
      )}
    />
    <div className='content-container'>
      <Hyperlink href='#' className='block default-hover' icon='arrow-right'>
        View all venues
      </Hyperlink>
    </div>
  </HomeSectionTemplate>
);

export default Venues;
