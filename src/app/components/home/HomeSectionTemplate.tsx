import React, { forwardRef, type ReactNode } from 'react';

interface HomeSectionProps {
  heading: string;
  children: ReactNode;
  description?: string;
  rightDiv?: JSX.Element;
}

const HomeSectionTemplate = forwardRef<HTMLDivElement, HomeSectionProps>(
  ({ heading, description, children, rightDiv }, ref) => (
    <div ref={ref} className='flex flex-col gap-6 relative'>
      <div className='content-container flex justify-between items-end'>
        <div>
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        {rightDiv}
      </div>
      {children}
    </div>
  )
);

HomeSectionTemplate.displayName = 'HomeSectionTemplate';

export default HomeSectionTemplate;
