import { useState, useEffect, useMemo } from 'react';
import useInterval from './useInterval';

interface Props {
  minutes: number;
  seconds: number;
  paused: boolean;
}

type Return = [
  {
    minutes: number,
    seconds: number,
    paused: boolean,
    timedOut: boolean,
  },
  {
    setMinutes: (minutes: number) => void,
    setSeconds: (minutes: number) => void,
  }
];

export default function useTimer({ minutes, seconds, paused }: Props): Return {
  
  const [mins, setMins] = useState(minutes);
  const [secs, setSecs] = useState(seconds);

  useInterval(() => {
    if (secs > 0) {
      setSecs(secs - 1);
    } else if (mins > 0) {
      setMins(mins - 1);
      setSecs(59);
    }
  }, (!mins && !secs) || paused ? 'stop' : 1000);

  const timedOut = useMemo(() => !mins && !secs, [mins, secs]);

  useEffect(() => {
    setMins(minutes);
    setSecs(seconds);
  }, [minutes, seconds]);

  return [
    {
      minutes: mins,
      seconds: secs,
      paused,
      timedOut
    },
    {
      setMinutes: setMins,
      setSeconds: setSecs,
    }
  ];
}
