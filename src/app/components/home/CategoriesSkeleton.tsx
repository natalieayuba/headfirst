import Skeleton from 'react-loading-skeleton';

const CategoriesSkeleton = () => {
  return (
    <div className='md:grid md:grid-flow-col md:grid-cols-4 md:w-full'>
      {[...Array(4)].map((k) => (
        <Skeleton key={k} className='w-48 aspect-[1.5] h-auto' />
      ))}
    </div>
  );
};

export default CategoriesSkeleton;
