import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DialogComponent from "./DialogComponent";
import "./gameplay.css";
const X = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: #32c4c3;
  border-radius: 15px;
  clip-path: polygon(
    20% 0%,
    0% 20%,
    30% 50%,
    0% 80%,
    20% 100%,
    50% 70%,
    80% 100%,
    100% 80%,
    70% 50%,
    100% 20%,
    80% 0,
    50% 30%
  );
`;

const O = styled.div`
  width: 50px;
  height: 50px;
  margin: -2px;
  border: 15px solid #f7b336;
  border-radius: 50%;
  transform: scale(0.7);
`;

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}
const human = <X />;
const cpu = <O />;
const humanFromRedux = "X";
const cpuFromRedux = "O";

function Gameplay() {
  // useEffect(()=>{
  //   const humanFromRedux = UseSelector((state) => state.pickplayer.human);
  // const cpuFromRedux = UseSelector((state) => state.pickplayer.cpu);
  // const human = humanFromRedux === "X" || cpuFromRedux === "O" ? <X /> : <O />;
  // const cpu = humanFromRedux === "X" || cpuFromRedux === "O" ? <O /> : <X />;

  // },[])
  const [dialogvisible, setDialogvisible] = useState();
  function handleClosedialog() {
    setDialogvisible(false);
  }
  const [Win, setWin] = useState();
  const [dispIcon, setDispIcon] = useState();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currPlayer, setCurrPlayer] = useState(!cpu); // false for O
  const [gameOver, setGameOver] = useState(false);
  const [hscore, setHscore] = useState(() => {
    const storedHscore = localStorage.getItem("humanScore");
    return storedHscore ? parseInt(storedHscore, 10) : 0;
  });
  const [cpscore, setCpscore] = useState(() => {
    const storedCpscore = localStorage.getItem("cpuScore");
    return storedCpscore ? parseInt(storedCpscore, 10) : 0;
  });
  const [tieScore, settieScore] = useState(() => {
    const storedTieScore = localStorage.getItem("tieScore");
    return storedTieScore ? parseInt(storedTieScore, 10) : 0;
  });

  // Update local storage when scores change
  useEffect(() => {
    localStorage.setItem("humanScore", hscore.toString());
    localStorage.setItem("cpuScore", cpscore.toString());
    localStorage.setItem("tieScore", tieScore.toString());
  }, [hscore, cpscore, tieScore]);
  const XonClick = (index) => {
    if (gameOver || squares[index]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = currPlayer ? cpu : human;
    setSquares(newSquares);
    setCurrPlayer(!currPlayer);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setDialogvisible(true);
      setWin("WIN");
      setDispIcon(human);
      setGameOver(true);
      if (!currPlayer) {
        setHscore(hscore + 1);
      } else {
        setCpscore(cpscore + 1);
      }
      return;
    }

    const emptySquares = newSquares.reduce((acc, value, ind) => {
      if (!value) {
        acc.push(ind);
      }
      return acc;
    }, []);

    if (emptySquares.length === 0) {
      setGameOver(true);
      settieScore(tieScore + 1);
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const cpuMove = emptySquares[randomIndex];
    if (cpuMove !== undefined) {
      newSquares[cpuMove] = cpu;
      setSquares(newSquares);
      setCurrPlayer(!human);
    }
    const cpuWinner = calculateWinner(newSquares);
    if (cpuWinner) {
      setWin("LOSE");
      setDialogvisible(true);
      setDispIcon(cpu);
      setGameOver(true);
      if (currPlayer) {
        setHscore(hscore + 1);
      } else {
        setCpscore(cpscore + 1);
      }
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setCurrPlayer(false); // false for O
    setGameOver(false);
  };
  return (
    <div className="gameplay">
      <div className="xo">
        <div id="x"></div>
        <div id="o"></div>
      </div>
      <div className="turn">{humanFromRedux}'s TURN</div>
      <button className="resetbtn" onClick={restartGame}></button>
      <DialogComponent
        className="dialog"
        icon={dispIcon}
        resetbtn={restartGame}
        status={Win}
        visibility={dialogvisible}
        closeDialog={handleClosedialog}
      />
      <div className="gamesection">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => XonClick(index)} />
        ))}
      </div>
      <div className="scoresection">
        <div className="xscore">
          <div className="x">{humanFromRedux} (YOU)</div>
          <div className="xs">{hscore}</div>
        </div>
        <div className="tie">
          <div className="tiescore">TIE</div>
          <div className="ties">{tieScore}</div>
        </div>
        <div className="oscore">
          <div className="o">{cpuFromRedux} (CPU)</div>
          <div className="os">{cpscore}</div>
        </div>
      </div>
    </div>
  );
}

export default Gameplay;
