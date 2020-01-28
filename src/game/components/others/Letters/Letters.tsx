import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import Collection from '../../utils/Collection/Collection';
import usePicker from '../../../hooks/usePicker';
import DraggableLetter from '../DraggableLetter/DraggableLetter';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface Props {
  word: string;
  allowDragging?: boolean;
}

const Letters: React.FC<Props> = ({ word, allowDragging = true }) => {

  const letters = useMemo(() => {
    let allLetters = word.split('');
    if (word.length < 9) {
      allLetters = _.concat(allLetters, _.sampleSize(LETTERS, 9 - word.length));
    }
    return _.shuffle(allLetters);
  }, [word]);

  const { pick, isPicked } = usePicker(letters);

  const onDrop = useCallback((result: { correctDrop: boolean }, index: number) => {
    if (result.correctDrop) {
      pick(index);
    }
  }, [pick]);

  return (
    <Collection>
      {
        letters.map((letter, index) => (
          <DraggableLetter
            letter={letter}
            dim={isPicked(index)}
            draggable={allowDragging && !isPicked(index)}
            onDrop={result => onDrop(result, index)}
            key={index}
          />
        ))
      }
    </Collection>
  );
};

export default Letters;
