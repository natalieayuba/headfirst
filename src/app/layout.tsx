import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Baloo_2, Londrina_Solid } from 'next/font/google';
import { colors, description, name, tagline } from '../../config';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/search/Search';
import { Suspense } from 'react';
import Loader from './components/Loader';

export const metadata: Metadata = {
  title: `${name} | ${tagline}`,
  description,
};

export const viewport: Viewport = {
  themeColor: colors['dark-night'],
  interactiveWidget: 'resizes-content',
};

const baloo_2 = Baloo_2({
  subsets: ['latin'],
  display: 'swap',
});

const londrina_solid = Londrina_Solid({
  weight: ['100', '300', '400', '900'],
  variable: '--font-londrina_solid',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${baloo_2.className} ${londrina_solid.variable} bg-dark-night text-white text-opacity-90 leading-tight`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
