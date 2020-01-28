import { useEffect, useState, useRef } from 'react';

export default function useInterval(handler: () => void, timeout: number | 'stop') {
  
  const [timestamp, setTimestamp] = useState(0);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (timeout !== 'stop') {
      const timer = setInterval(() => {
        setTimestamp(Date.now());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeout]);

  useEffect(() => {
    if (timestamp) {
      handlerRef.current();
    }
  }, [timestamp, handlerRef]);
}
