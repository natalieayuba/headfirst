import { appendClassName } from '@/utils/formatting';
import type { ReactNode } from 'react';

interface CheckoutSectionProps {
  heading: string;
  children: ReactNode;
  className?: string;
}

const CheckoutSection = ({
  heading,
  children,
  className,
}: CheckoutSectionProps) => (
  <div
    className={`bg-night rounded-lg mt-6 h-fit flex-1${appendClassName(
      className
    )}`}
  >
    <h2 className='p-4 pb-0 text-xl mb-0'>{heading}</h2>
    <div className='p-4 pt-0'>{children}</div>
  </div>
);

export default CheckoutSection;
