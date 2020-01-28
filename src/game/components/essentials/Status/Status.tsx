import React from 'react';
import './Status.css';

interface Props {
  show: boolean;
  status: boolean;
}

const Status: React.FC<Props> = ({ show, status }) => {
  if (!show) {
    return <React.Fragment/>;
  }
  
  return (
    <i className={`material-icons status status--${status ? 'succeeded' : 'failed'}`}>
      {status ? 'check' : 'close'}
    </i>
  );
};

export default Status;
