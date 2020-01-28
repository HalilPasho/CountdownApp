import React from 'react';
import Game from './game/Game';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Game
        description="Create the word by dragging letters into the empty boxes"
        note="You have one minute"
        words={['SEEK', 'TEST', 'ZOOM', 'KEEP']}
        time={{ minutes: 1, seconds: 0 }}
        maxWrongLetter={3}
      />
    </div>
  );
}

export default App;
