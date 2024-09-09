import React from 'react';
import DateDropdown from './components/filters/DateDropdown';
import FilteredEvents from './components/FilteredEvents';
import CategoryChips from './components/filters/CategoryChips';
import PriceDropdown from './components/filters/PriceDropdown';
import { getCategories, getEvents, getVenues } from '@/db/queries';
import Header from '../components/Header';
import Search from '../components/search/Search';
import type { Metadata } from 'next';
import type { CategoryProps, SubcategoryProps } from '@/db/schema';
import { toSentenceCase } from '@/utils/formatting';
import Main from '../components/Main';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const getTitle = (category: CategoryProps, subcategory: SubcategoryProps) => {
  let title = '';
  if (category) {
    if (subcategory) {
      title += `${toSentenceCase(subcategory.name)} `;
    }
    title += toSentenceCase(category.name);
  } else {
    title += "What's on";
  }
  return (title += ' in Bristol');
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { categoryId, subcategoryId } = searchParams;
  const categories = await getCategories();
  const category = categories.find(({ id }) => id === categoryId)!;
  const subcategory = (
    category
      ? category.subcategories.find(({ id }) => id === subcategoryId)
      : null
  )!;
  return {
    title: getTitle(category, subcategory),
  };
}

const WhatsOn = async ({ searchParams }: Props) => {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();
  const { categoryId, subcategoryId } = searchParams;
  const category = categories.find((category) => category.id === categoryId)!;
  const subcategory = (
    category
      ? category.subcategories.find(({ id }) => id === subcategoryId)
      : null
  )!;

  return (
    <Main>
      <Header search={<Search />} />
      <h1 className='text-4xl content-container pb-2'>
        {getTitle(category, subcategory)}
      </h1>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 content-container'>
          <DateDropdown />
          <PriceDropdown events={events} />
        </div>
        <CategoryChips categories={categories} />
      </div>
      <FilteredEvents events={events} venues={venues} />
    </Main>
  );
};

export default WhatsOn;
