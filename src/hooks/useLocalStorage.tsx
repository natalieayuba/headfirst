import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : initialValue;
      return initial;
    }
  });

  const updateValue = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
};

export default useLocalStorage;
