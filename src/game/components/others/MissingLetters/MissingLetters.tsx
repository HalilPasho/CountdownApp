import React, { useCallback, useMemo } from 'react';
import Collection from '../../utils/Collection/Collection';
import LetterDropBox from '../LetterDropBox/LetterDropBox';
import useSlots from '../../../hooks/useSlots';

interface Props {
  word: string;
  onWrongLetter: () => void;
  onWordComplete: () => void;
}

const MissingLetters: React.FC<Props> = ({ word, onWrongLetter, onWordComplete }) => {

  const results = useMemo(() => word.split(''), [word]);

  const [slots, { setSlot, isCorrectPosition, isAllCorrectExpectPosition }] = useSlots({ results });

  const onDrop = useCallback((letter: string, index: number) => {
    const correctDrop = letter === word.charAt(index);
    setSlot(letter, index);
    if (!correctDrop) {
      onWrongLetter();
    } else if (isAllCorrectExpectPosition(index)) {
      onWordComplete();
    }
    return { correctDrop };
  }, [word, setSlot, onWrongLetter, onWordComplete, isAllCorrectExpectPosition]);

  return (
    <Collection>
      {
        slots.map((letter, index) => {
          return (
            <LetterDropBox
              letter={letter}
              status={isCorrectPosition(index) ? 'correct' : 'wrong'}
              droppable={!isCorrectPosition(index)}
              onDrop={letter => onDrop(letter, index)}
              key={index}
            />
          );
        })
      }
    </Collection>
  );
};

export default MissingLetters;
