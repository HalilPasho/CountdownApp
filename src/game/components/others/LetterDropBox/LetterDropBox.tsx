import React from 'react';
import { useDrop, DragObjectWithType } from 'react-dnd';
import Box from '../../essentials/Box/Box';
import Letter from '../../essentials/Letter/Letter';

interface Props {
  letter?: string;
  status: 'correct' | 'wrong';
  droppable: boolean;
  onDrop: (letter: string) => { correctDrop: boolean };
}

const LetterDropBox: React.FC<Props> = ({ letter, status, droppable = false, onDrop }) => {

  const [, drop] = useDrop({
    accept: 'letter',
    canDrop: () => droppable,
    drop: ({ letter }: DragObjectWithType & { letter: string }) => onDrop(letter),
  })

  if (letter) {
    return (
      <Letter
        ref={drop}
        letter={letter}
        status={status}
      />
    );
  }

  return <Box ref={drop} />;
};

export default LetterDropBox;
