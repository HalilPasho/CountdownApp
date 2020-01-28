import { useMemo, useState, useEffect, useCallback } from 'react';

interface Props<T> {
  results: T[];
}

type Return<T> = [
  (T | undefined)[],
  {
    setSlot: (slot: T, index: number) => void;
    isCorrectPosition: (index: number) => boolean;
    isAllCorrectExpectPosition: (index: number) => boolean;
  }
];

function createEmpty<T>(slots: T[]): (T | undefined)[] {
  return slots.map(() => undefined);
}

export default function useSlots<T>({ results }: Props<T>): Return<T> {
  
  const initSlots = useMemo(() => createEmpty(results), [results]);

  const [slots, setSlots] = useState(initSlots);

  const setSlot = useCallback((slot: T, index: number) => {
    const newSlots = slots.concat();
    newSlots[index] = slot;
    setSlots(newSlots);
  }, [slots]);

  const isCorrectPosition = useCallback((index: number) => slots[index] === results[index], [slots, results]);

  const isAllCorrectExpectPosition = useCallback((index: number) => {
    return slots.every((_, i) => index === i || isCorrectPosition(i))
  }, [slots, isCorrectPosition]);

  useEffect(() => setSlots(initSlots), [initSlots]);

  return [
    slots,
    {
      setSlot,
      isCorrectPosition,
      isAllCorrectExpectPosition,
    }
  ];
}
