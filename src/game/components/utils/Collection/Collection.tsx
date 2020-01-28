import React from 'react';
import './Collection.css';

interface Props {
}

const Collection: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="collection">
      {children}
    </div>
  );
};

export default Collection;
