import { useState, useCallback } from 'react';
import _ from 'lodash';

function pickRandom<T>(cases: T[]): T {
  return _.sample<T>(cases)!;
}

export default function useRulette<T>(cases: T[]): [T, () => void] {

  const [result, setResult] = useState(() => pickRandom<T>(cases));
  
  const shuffle = useCallback(() => {
    setResult(pickRandom(cases));
  }, [cases]);

  return [result, shuffle];
}
