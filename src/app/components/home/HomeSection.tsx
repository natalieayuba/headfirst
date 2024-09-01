import React, { type ReactNode } from 'react';

interface HomeSectionProps {
  heading: string;
  children: ReactNode;
  caption?: string;
  rightDiv?: JSX.Element;
}

const HomeSection = ({
  heading,
  caption,
  children,
  rightDiv,
}: HomeSectionProps) => (
  <div className='flex flex-col gap-4 md:gap-7 my-16 md:my-40 relative'>
    <header className='content-container flex justify-between items-end'>
      <div>
        <h2>{heading}</h2>
        <p className='mb-2'>{caption}</p>
      </div>
      {rightDiv}
    </header>
    {children}
  </div>
);

export default HomeSection;
