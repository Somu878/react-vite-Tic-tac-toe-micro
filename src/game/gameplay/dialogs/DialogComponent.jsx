import React from "react";
import { Dialog } from "primereact/dialog";
import "./dialog.css";
import { Link } from "react-router-dom";
export default function DialogComponent({ resetbtn, status,visibility,closeDialog,icon }) {
  return (
    <div>
      <Dialog visible={visibility} closable={false} className="dialog">
        <div className="winstatus">{status}</div>
        <div className="icon">{icon}</div>
        <div className="wintitle"> TAKES THE GAME</div>
        <Link to={"/"}>
          <button className="quitbtn" onClick={()=>{
             localStorage.setItem("humanScore",'0');
             localStorage.setItem("cpuScore", '0');
             localStorage.setItem("tieScore",'0');
          }}
          >QUIT</button>
        </Link>
        <button
          className="nextRoundbtn"
          onClick={() => {
            resetbtn();
            closeDialog()
          }}
        >
         NEXT ROUND
        </button>
      </Dialog>
    </div>
  );
}
