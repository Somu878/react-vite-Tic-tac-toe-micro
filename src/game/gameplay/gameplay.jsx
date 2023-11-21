import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DialogComponent from "./dialogs/DialogComponent";
import { useSelector } from "react-redux";
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

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);
// const human = <X />;
// const cpu = <O />;
// const humanFromRedux = "X";
// const cpuFromRedux = "O";
const Gameplay = () => {
  const humanFromRedux = useSelector((state) => state.pickplayer.human);
  const cpuFromRedux = useSelector((state) => state.pickplayer.cpu);

  const humanIcon = humanFromRedux === "X" || cpuFromRedux === "O" ? <X /> : <O />;
  const cpuIcon = humanFromRedux === "X" || cpuFromRedux === "O" ? <O /> : <X />;

  const [dialogVisible, setDialogVisible] = useState(false);
  const [win, setWin] = useState();
  const [dispIcon, setDispIcon] = useState();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currPlayer, setCurrPlayer] = useState(false); // false for O
  const [gameOver, setGameOver] = useState(false);
  const [hscore, setHscore] = useState(() => parseInt(localStorage.getItem("humanScore"), 10) || 0);
  const [cpscore, setCpscore] = useState(() => parseInt(localStorage.getItem("cpuScore"), 10) || 0);
  const [tieScore, setTieScore] = useState(() => parseInt(localStorage.getItem("tieScore"), 10) || 0);

  useEffect(() => {
    localStorage.setItem("humanScore", hscore.toString());
    localStorage.setItem("cpuScore", cpscore.toString());
    localStorage.setItem("tieScore", tieScore.toString());
  }, [hscore, cpscore, tieScore]);

  const handleSquareClick = (index) => {
    if (gameOver || squares[index]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = currPlayer ? cpuIcon : humanIcon;
    setSquares(newSquares);
    setCurrPlayer((prevPlayer) => !prevPlayer);

    const winner = calculateWinner(newSquares);

    if (winner) {
      setDialogVisible(true);
      setWin(winner === humanIcon ? "YOU WON" : "CPU WON");
      setDispIcon(winner === humanIcon ? "X" : "O");
      setGameOver(true);

      if (winner === humanIcon) {
        setHscore((prevScore) => prevScore + 1);
      } else {
        setCpscore((prevScore) => prevScore + 1);
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
      setTieScore((prevScore) => prevScore + 1);
      return;
    }

    // Calculate CPU move after human move
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const cpuMove = emptySquares[randomIndex];
      if (cpuMove !== undefined) {
        newSquares[cpuMove] = cpuIcon;
        setSquares(newSquares);
        setCurrPlayer((prevPlayer) => !prevPlayer);

        const cpuWinner = calculateWinner(newSquares);
        if (cpuWinner) {
          setWin("CPU WON");
          setDialogVisible(true);
          setDispIcon("O");
          setGameOver(true);
          setCpscore((prevScore) => prevScore + 1);
        }
      }
    }, 500);
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
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
      <DialogComponent
        className="dialog"
        icon={dispIcon}
        resetbtn={restartGame}
        status={win}
        visibility={dialogVisible}
        closeDialog={() => setDialogVisible(false)}
      />
      <div className="xo">
        <div id="x"></div>
        <div id="o"></div>
      </div>
      <div className="turn">{!currPlayer ? `${humanFromRedux} TURN` : `${cpuFromRedux} TURN`}</div>
      <button className="resetbtn" onClick={() => setDispRefresh(true)}></button>
      <div className="gamesection">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleSquareClick(index)} />
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
};

export default Gameplay;
