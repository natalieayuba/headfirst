import React, { forwardRef, type ReactNode } from 'react';

interface HomeSectionProps {
  heading: string;
  children: ReactNode;
  caption?: string;
  rightDiv?: JSX.Element;
}

const HomeSection = forwardRef<HTMLDivElement, HomeSectionProps>(
  ({ heading, caption, children, rightDiv }, ref) => (
    <div ref={ref} className='flex flex-col gap-6 relative'>
      <div className='content-container flex justify-between items-end'>
        <div>
          <h2>{heading}</h2>
          <p>{caption}</p>
        </div>
        {rightDiv}
      </div>
      {children}
    </div>
  )
);

HomeSection.displayName = 'HomeSection';

export default HomeSection;
