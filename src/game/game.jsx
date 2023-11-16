import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pickplayer from './pickplayer/Pickplayer';
import Gameplay from './gameplay/gameplay';
import './game.css'
function Game() {
  return (
    <div className='gamecomponent'>
       
      <Router>
        <Routes>
          <Route path="/" element={<Pickplayer />} />
          <Route path="/gameplay" element={<Gameplay />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Game;
