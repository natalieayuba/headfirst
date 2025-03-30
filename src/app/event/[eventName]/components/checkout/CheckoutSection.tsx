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
  <section
    className={`bg-night rounded-lg mt-6 h-fit flex-1 p-4 ${appendClassName(
      className
    )}`}
  >
    <h2 className='text-xl mb-0'>{heading}</h2>
    <div>{children}</div>
  </section>
);

export default CheckoutSection;
