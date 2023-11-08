import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pickplayer.css'
function Pickplayer() {
  const inviteToast=()=>{
    toast("Invite link copied",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeButton:false,
      className: 'invite-toast'
    })
  }
  return (
    <div className='pickplayer' >
        <div className='logo'>
            <div id='x'></div>
            <div id='o'></div>
        </div>
        <div className='pickplaybtns'>
            <div className='title'>PICK PLAYER</div>
            <div className='xobtns'>
              <button id='xbtn'>O</button>
              <button id='obtn'>X</button>
            </div>
        </div>
        <button className='ngvscpu'>NEW GAME (VS CPU)</button>
        <button className='ngvshuman'>NEW GAME (VS HUMAN) coming soon</button>
        <button className='invitefriend' onClick={inviteToast}>Invite your friend</button>
        <ToastContainer/>
    </div>
  )
}

export default Pickplayer