import React, { forwardRef } from 'react';
import Box from '../Box/Box';
import './Letter.css';

interface Props {
  letter: string;
  status?: 'correct' | 'wrong';
  dim?: boolean;
  draggable?: boolean;
  onDrop?: (result: any) => void;
};

const Letter = forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({ letter, status, dim = false, draggable = false, onDrop }, ref) => {
  let className = '';

  if (status === 'correct') {
    className += ' letter--correct';
  } else if (status === 'wrong') {
    className += ' letter--wrong';
  } else if (dim) {
    className += ' letter--dim';
  }

  return (
    <Box ref={ref} className={`letter ${className}`}>
      {letter}
    </Box>
  );
});

export default Letter;
