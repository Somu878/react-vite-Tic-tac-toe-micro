import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./pickplayer.css";
import { Xbtnhandle, Obtnhandle } from "../../redux/PickplayerSlice";
import { useSelector, useDispatch } from "react-redux";
function Pickplayer() {
  const linkTobecopied = window.location.href.toString();
  const inviteToast = () => {
    toast("Invite link copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: false,
      className: "invite-toast",
    });
  };
 
  const human = useSelector((state) => state.pickplayer.human);
  const dispatch = useDispatch();
  const handleXClick = () => {
    dispatch(Xbtnhandle());
  };

  const handleOClick = () => {
    dispatch(Obtnhandle());
  };

  return (
    <div className="pickplayer">
      <div className="logo">
        <div id="x"></div>
        <div id="o"></div>
      </div>

      <div className="pickplaybtns">
        <div className="title">PICK PLAYER</div>
        <div className="xobtns">
          <button
            id="obtn"
            onClick={handleOClick}
            className={human === "O" ? "active" : ""}
          >
        <div id="oid" className={human === "O" ? "active" : ""}></div>
          </button>
          <button
            id="xbtn"
            onClick={handleXClick}
            className={human === "X" ? "active" : ""}
          >
           <div id='xid' className={human==="X" ? "active":""}></div>
          </button>
        </div>
      </div>
      <Link to="/gameplay">
        <button className="ngvscpu">NEW GAME (VS CPU)</button>
      </Link>
      <button className="ngvshuman" onClick={() => {}}>
        NEW GAME (VS HUMAN) Coming soon
      </button>
      <CopyToClipboard text={linkTobecopied}>
        <button className="invitefriend" onClick={inviteToast}>
          Invite your friend
        </button>
      </CopyToClipboard>
      <ToastContainer />
    </div>
  );
}

export default Pickplayer;
