import React, { type ReactNode } from 'react';

interface HomeSectionProps {
  heading: string;
  children: ReactNode;
  caption?: string;
}

const HomeSection = ({ heading, caption, children }: HomeSectionProps) => {
  return (
    <div className='flex flex-col gap-6 px-6 my-16'>
      <header>
        <h2>{heading}</h2>
        <p>{caption}</p>
      </header>
      {children}
    </div>
  );
};

export default HomeSection;
