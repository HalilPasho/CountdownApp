import React from 'react';
import { useDrag } from 'react-dnd';
import Letter from '../../essentials/Letter/Letter';

interface Props {
  letter: string;
  status?: 'correct' | 'wrong';
  dim?: boolean;
  draggable?: boolean;
  onDrop?: (result: any) => void;
};

const DraggableLetter: React.FC<Props> = ({ letter, status, dim = false, draggable = false, onDrop }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { letter, type: 'letter' },
    canDrag: draggable,
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        if (onDrop) {
          onDrop(monitor.getDropResult());
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Letter
      ref={drag}
      letter={letter}
      status={status}
      dim={dim || isDragging}
      onDrop={onDrop}
    />
  );
};

export default DraggableLetter;
