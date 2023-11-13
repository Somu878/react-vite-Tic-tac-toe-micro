import React from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pickplayer.css'
import { Xbtnhandle,Obtnhandle } from '../../redux/PickplayerSlice';
import { useSelector, useDispatch } from 'react-redux'
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
  const human = useSelector((state)=>state.pickplayer.human)
  const cpu = useSelector((state)=>state.pickplayer.cpu)
  const dispatch = useDispatch()
  const handleXClick = () => {
    dispatch(Xbtnhandle());
  };

  const handleOClick = () => {
    dispatch(Obtnhandle());
  };
  return (
    <div className='pickplayer' >
        <div className='logo'>
            <div id='x'></div>
            <div id='o'></div>
        </div>
        <div className='pickplaybtns'>
            <div className='title'>PICK PLAYER</div>
            <div className='xobtns'>
              <button id='xbtn' onClick={handleOClick}>O</button>
              <button id='obtn'onClick={handleXClick} >X</button>
            </div>
        </div>
        <Link to='/gameplay'>
        <button className='ngvscpu' >NEW GAME (VS CPU)</button>
        </Link>
        <button className='ngvshuman' onClick={()=>{
          console.log(human);
          console.log(cpu);
        }}>NEW GAME (VS HUMAN) Coming soon</button>
        <button className='invitefriend' onClick={inviteToast}>Invite your friend</button>
        <ToastContainer/>
    </div>
  )
}

export default Pickplayer