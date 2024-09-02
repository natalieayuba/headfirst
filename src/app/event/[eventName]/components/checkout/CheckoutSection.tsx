import type { ReactNode } from 'react';

const CheckoutSection = ({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) => (
  <div className='bg-night rounded-lg p-4 flex flex-col gap-2 mt-6'>
    <h2 className='mt-1 mb-0'>{heading}</h2>
    {children}
  </div>
);

export default CheckoutSection;
