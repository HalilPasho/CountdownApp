import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Timer from './components/essentials/Timer/Timer';
import Text from './components/essentials/Text/Text';
import Letters from './components/others/Letters/Letters';
import MissingLetters from './components/others/MissingLetters/MissingLetters';
import Status from './components/essentials/Status/Status';
import useTimer from './hooks/useTimer';
import useCounter from './hooks/useCounter';
import useRulette from './hooks/useRulette';
import Button from './components/essentials/Button/Button';

interface Props {
  words: string[];
  time: {
    minutes: number;
    seconds: number;
  };
  description: string;
  note: string;
  maxWrongLetter: number;
}

const Game: React.FC<Props> = ({ words, time, description, note, maxWrongLetter }) => {

  const [status, setStatus] = useState<'running' | 'succeeded' | 'failed'>('running');
  const hasEnded = useMemo(() => ['succeeded', 'failed'].includes(status), [status]);

  const [{ minutes, seconds, timedOut }, { setMinutes, setSeconds }] = useTimer({ ...time, paused: hasEnded });

  const [{ hasReachedLimit }, { increase: increaseCounter, reset: resetCounter }] = useCounter(maxWrongLetter);

  const [word, changeWord] = useRulette(words);

  useEffect(() => {
    if (timedOut || hasReachedLimit) {
      setStatus('failed');
    }
  }, [timedOut, hasReachedLimit]);

  const reset = useCallback(() => {
    setMinutes(time.minutes);
    setSeconds(time.seconds);
    changeWord();
    resetCounter();
    setStatus('running');
  }, [time.minutes, time.seconds, setMinutes, setSeconds, changeWord, resetCounter, setStatus]);

  return (
    <React.Fragment>
      <DndProvider backend={Backend}>
        <Timer
          minutes={minutes}
          seconds={seconds}
        />

        <Text type={'large'}>{description}</Text>
        <Text>{note}</Text>

        <Letters
          word={word}
          allowDragging={!hasEnded}
        />

        <MissingLetters
          word={word}
          onWrongLetter={increaseCounter}
          onWordComplete={() => setStatus('succeeded')}
        />

        <Status
          show={hasEnded}
          status={status === 'succeeded'}
        />

        {
          hasEnded && (
            <Button onClick={reset}>
              Try Again
            </Button>
          )
        }
        
      </DndProvider>
    </React.Fragment>
  );
};

export default Game;
