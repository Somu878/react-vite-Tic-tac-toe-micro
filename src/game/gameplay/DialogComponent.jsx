import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./dialog.css";
import { Link } from "react-router-dom";
export default function DialogComponent({ resetbtn, status,visibility,closeDialog,icon }) {
  return (
    <div>
      <Dialog visible={visibility} closable={false} className="dialog">
        <div className="winstatus">YOU {status}</div>
        <div className="icon">{icon}</div>
        <div className="wintitle"> TAKES THE GAME</div>
        <Link to={"/"}>
          <button className="quitbtn">QUIT</button>
        </Link>
        <button
          className="playAgainbtn"
          onClick={() => {
            resetbtn();
            closeDialog()
          }}
        >
          PLAY AGAIN
        </button>
      </Dialog>
    </div>
  );
}
