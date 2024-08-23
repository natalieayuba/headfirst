import React from 'react';
import Icon from '../Icon';
import type { VenueProps } from '../EventProps';

const CopyAddressButton = ({ venue }: { venue: VenueProps }) => {
  const handleClick = () => {
    const address = `${venue.name}, ${venue.address}`;
    navigator.clipboard.writeText(address);
    alert('Copied the text: ' + address);
  };

  return (
    <button
      className='flex gap-4 text-left items-center'
      title='Copy to clipboard'
      onClick={handleClick}
    >
      <div>
        <p>{venue.name}</p>
        <p className='secondary-text leading-tight'>{venue.address}</p>
      </div>
      <div title='Copy to clipboard'>
        <Icon name='copy' size={20} />
      </div>
    </button>
  );
};

export default CopyAddressButton;
