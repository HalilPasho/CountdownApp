import React from 'react';
import './Text.css';

interface Props {
  type?: 'large' | 'normal' | 'small';
}

const Text: React.FC<React.PropsWithChildren<Props>> = ({ type = 'normal', children }) => {
  return (
    <div className={`text text--${type}`}>
      {children}
    </div>
  );
};

export default Text;
