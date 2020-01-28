import React from 'react';
import './Button.css';

interface Props {
  onClick: () => void;
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
