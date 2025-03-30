import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Baloo_2, Londrina_Solid } from 'next/font/google';
import { colors, description, name } from '../../config';
import Footer from './components/navigation/Footer';
import Header from './components/navigation/Header';

export const metadata: Metadata = {
  title: {
    template: `%s | ${name}`,
    default: `${name} | ${description}`,
  },
  description,
  other: {
    'apple-itunes-app':
      'app-id=444081524, app-argument=https://apple.co/4gemecV',
  },
};

export const viewport: Viewport = {
  themeColor: colors['dark-night'],
  colorScheme: 'dark',
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

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang='en' className='h-full'>
    <body
      className={`${baloo_2.className} ${londrina_solid.variable} bg-dark-night text-white text-opacity-90 selection:bg-lilac selection:bg-opacity-20 leading-normal flex flex-col h-full overflow-x-hidden`}
    >
      <Header />
      {children}
      <Footer />
      <div id='modal-root'></div>
    </body>
  </html>
);

export default RootLayout;
