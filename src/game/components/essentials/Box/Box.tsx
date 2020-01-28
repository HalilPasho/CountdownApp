import React, { forwardRef } from 'react';
import './Box.css';

interface Props {
  className?: string;
}

const Box = forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({ className = '', children }, ref) => {
  return (
    <div ref={ref} className={`box ${className}`}>
      {children}
    </div>
  );
});

export default Box;
