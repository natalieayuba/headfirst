import { useEffect, useState } from 'react';

const useData = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);

  // const toggleSaveEvent = (event: EventProps) => {
  //   event.saved = !event.saved;
  // };

  // useEffect(() => {
  //   const getData = () => {
  //     var requestOptions = {
  //       method: 'GET',
  //       redirect: 'follow',
  //     } as RequestInit;

  //     fetch('http://localhost:3030/posts', requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => setPosts(result))
  //       .catch((error) => console.log('error', error));
  //       getData();
  //   };
  // }, []);

  return { events, setEvents, categories, venues };
};

export default useData;
