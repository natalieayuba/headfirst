import { getCategories, getEvents, getVenues } from '@/data/utils';
import SearchLightbox from './SearchLightbox';

const Search = async () => {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();

  return (
    <SearchLightbox events={events} venues={venues} categories={categories} />
  );
};

export default Search;
