import React from 'react'
import './pickplayer.css'
function Pickplayer() {
  return (
    <div className='pickplayer' >
        <div className='logo'>
            <div id='x'></div>
            <div id='o'></div>
        </div>
        <div className='pickplaybtns'>
            <div className='title'>PICK PLAYER</div>
            <div className='xobtns'>
              <button id='xbtn'>X</button>
              <button id='obtn'>O</button>
            </div>
        </div>
        <button className='ngvscpu'>NEW GAME (VS CPU)</button>
        <button className='ngvshuman'>NEW GAME (VS HUMAN) coming soon</button>
        <button className='invitefriend'>Invite your friend</button>
    </div>
  )
}

export default Pickplayer