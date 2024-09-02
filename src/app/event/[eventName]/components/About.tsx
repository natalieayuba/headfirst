'use client';
import React, { useEffect, useRef, useState } from 'react';

const About = ({ about }: { about: string }) => {
  const [readMore, setReadMore] = useState(false);
  const maxLength = 1000;
  const urlRegex = /(https?\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;
  const aboutRef = useRef<HTMLParagraphElement>(null);

  const replacer = (matched: string) => {
    let withProtocol = matched;
    if (!withProtocol.startsWith('http')) {
      withProtocol = 'http://' + matched;
    }
    const newStr = `<a class="link" href="${withProtocol}">${matched}</a>`;

    return newStr;
  };

  const aboutWithLinks = about.replaceAll(urlRegex, replacer);

  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.innerHTML = aboutWithLinks;
    }
  }, []);

  return (
    <div>
      <h2 className='mb-4'>About this event</h2>
      <p
        ref={aboutRef}
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
