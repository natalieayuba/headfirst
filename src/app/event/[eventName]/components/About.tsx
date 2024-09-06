'use client';
import React, { useState } from 'react';

const About = ({ about }: { about: string }) => {
  const [readMore, setReadMore] = useState(false);
  const maxLength = 1000;

  return (
    <div>
      <h2 className='mb-4'>About this event</h2>
      <p
        className={`text-white text-opacity-60 whitespace-pre-wrap break-words${
          readMore
            ? ''
            : about.length > maxLength
            ? ' line-clamp-6 md:line-clamp-[10]'
            : ''
        }`}
      >
        {about}
      </p>
      {about.length > maxLength && !readMore && (
        <button className='link pt-4' onClick={() => setReadMore(!readMore)}>
          Read more
        </button>
      )}
    </div>
  );
};

export default About;
