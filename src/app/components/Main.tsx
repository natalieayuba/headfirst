import React, { type ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  paddingTop?: boolean;
}

const Main = ({ children, paddingTop = true }: MainProps) => (
  <main {...(paddingTop && { className: 'pt-[76px] md:pt-[94px]' })}>
    {children}
  </main>
);

export default Main;
