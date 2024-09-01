'use client';
import React, { useState } from 'react';

const About = ({ about }: { about: string }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div>
      <h2 className='mb-4'>About this event</h2>
      <p
        className={`text-white text-opacity-60 whitespace-pre-wrap break-words${
          readMore ? '' : ' line-clamp-6 md:line-clamp-[12]'
        }`}
      >
        {about}
      </p>
      <button
        className={`link pt-4${readMore ? ' hidden' : ''}`}
        onClick={() => setReadMore(!readMore)}
      >
        Read {readMore ? 'less' : 'more'}
      </button>
    </div>
  );
};

export default About;
