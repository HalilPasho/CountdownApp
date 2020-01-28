import { useMemo, useState, useCallback, useEffect } from 'react';

export default function usePicker<T>(items: T[]) {

  const initStatuses = useMemo(() => items.map(() => false), [items]);

  const [statuses, setStatuses] = useState(initStatuses);

  const pick = useCallback((index: number) => {
    const newStatuses = statuses.concat();
    newStatuses[index] = true;
    setStatuses(newStatuses);
  }, [statuses]);

  const isPicked = useCallback((index: number) => statuses[index], [statuses]);

  useEffect(() => setStatuses(initStatuses), [initStatuses]);

  return {
    pick,
    isPicked,
  };
}
