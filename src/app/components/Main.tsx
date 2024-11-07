import { appendClassName } from '@/utils/formatting';
import React, { type ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

const Main = ({ children, className }: MainProps) => (
  <main className={`pt-[76px] md:pt-[94px]${appendClassName(className)}`}>
    {children}
  </main>
);

export default Main;
