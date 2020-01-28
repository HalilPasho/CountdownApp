import React from 'react';
import './Timer.css';

interface Props {
  minutes: number;
  seconds: number;
}

const Timer: React.FC<Props> = ({ minutes, seconds }) => {
  return (
    <div className="timer">
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default Timer;
