import { useRef, useState } from 'react';

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const toggleDialog = () => setIsOpen(!isOpen);
  return { isOpen, toggleDialog, dialogRef };
};

export default useDialog;
