import { useState } from 'react';
import {
  events as defaultEvents,
  type EventProps,
} from '@/components/database';

const useEvents = () => {
  const [events, setEvents] = useState(defaultEvents);

  const toggleSaveEvent = (event: EventProps) => {
    event.saved = !event.saved;
  };

  return { events, setEvents };
};

export default useEvents;
