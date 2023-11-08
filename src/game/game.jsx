import React from 'react'
import './game.css'
import Pickplayer from './pickplayer/Pickplayer'
import Gameplay from './gameplay/gameplay'
function Game() {
  return (
    <div className='gamecomponent'>
        {/* <Pickplayer/> */}
        <Gameplay/>
    </div>
  )
}

export default Game