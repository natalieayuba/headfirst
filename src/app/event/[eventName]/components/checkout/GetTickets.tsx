import React from 'react';
import Tickets from './Tickets';
import Donate from './Donate';
import type { TicketProps } from '@/db/schema';

const GetTickets = ({
  tickets,
  ticketCount,
  setTicketCount,
  setDonation,
}: {
  tickets: TicketProps[];
  ticketCount: number[];
  setTicketCount: (count: number[]) => void;
  setDonation: (donation: number) => void;
}) => {
  return (
    <div>
      <Tickets
        tickets={tickets}
        ticketCount={ticketCount}
        setTicketCount={setTicketCount}
      />
      <Donate setDonation={setDonation} />
    </div>
  );
};

export default GetTickets;
