import { useState, useCallback, useMemo } from 'react';

type Return = [
  {
    counter: number;
    hasReachedLimit: boolean;
  },
  {
    increase: () => void;
    reset: () => void;
  }
];

export default function useCounter(limit: number): Return {

  let [counter, setCounter] = useState(0);

  const hasReachedLimit = useMemo(() => counter === limit, [counter, limit]);

  const increase = useCallback(() => {
    if (!hasReachedLimit) {
      setCounter(counter + 1);
    }
  }, [hasReachedLimit, counter]);

  const reset = useCallback(() => setCounter(0), [setCounter]);

  return [
    {
      counter,
      hasReachedLimit,
    },
    {
      increase,
      reset,
    }
  ];
}
