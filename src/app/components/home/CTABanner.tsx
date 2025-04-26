import React, { type ReactNode } from 'react';

interface CTABannerProps {
  children: ReactNode;
  heading: string;
  description: string;
  headingClassName?: string;
  descriptionClassName?: string;
}

const CTABanner = ({
  children,
  heading,
  description,
  headingClassName,
  descriptionClassName,
}: CTABannerProps) => (
  <div className='content-container'>
    <div className='bg-lilac rounded-lg pt-11 px-6 text-night h-[500px] text-center overflow-hidden relative'>
      <h2 className={`heading-lg mb-3 font-bold ${headingClassName ?? ''}`}>
        {heading}
      </h2>
      <p className={descriptionClassName}>{description}</p>
      <div className='mt-4'>{children}</div>
    </div>
  </div>
);

export default CTABanner;
