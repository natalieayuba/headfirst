import React from 'react';
import Tickets from './Tickets';
import Donate from './Donate';
import type { TicketProps } from '@/data/data';

const GetTickets = ({
  tickets,
  ticketCount,
  setTicketCount,
  donation,
  setDonation,
}: {
  tickets: TicketProps[];
  ticketCount: number[];
  setTicketCount: (count: number[]) => void;
  donation: number;
  setDonation: (donation: number) => void;
}) => {
  return (
    <>
      <Tickets
        tickets={tickets}
        ticketCount={ticketCount}
        setTicketCount={setTicketCount}
      />
      <Donate donation={donation} setDonation={setDonation} />
    </>
  );
};

export default GetTickets;
