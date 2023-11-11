import React from "react";
import styled from "styled-components";
import { useState } from "react";
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

const humanFromLocalStorage = localStorage.getItem('human');
const cpuFromLocalStorage = localStorage.getItem('cpu');
const human = humanFromLocalStorage === 'X' || cpuFromLocalStorage === 'O' ? <X /> : <O />;
const cpu = humanFromLocalStorage === 'X' || cpuFromLocalStorage === 'O' ? <O /> : <X />;

function Square({ value, handleclick }) {
  return (
    <button className="square" onClick={handleclick}>
      {value}
    </button>
  );
}
function Gameplay() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currPlayer, setcurrPlayer] = useState(!cpu); //Check 1 false for O
  const [gameOver, setGameOver] = useState(false);
  const XonClick = (index) => {
    if (squares[index] || gameOver) {
      return;
    }
   
    const newSquares = squares.slice();
    newSquares[index] = currPlayer ? cpu: human;
    setSquares(newSquares);
    setcurrPlayer(!currPlayer);
    let winner = calculateWinner(newSquares)
    if(winner){
     setGameOver(true)
    }
    const emptySquares = newSquares.reduce((acc, value, ind) => {
      if (!value) {
        acc.push(ind);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const cpuMove = emptySquares[randomIndex];
    if (cpuMove !== undefined) {
      newSquares[cpuMove] =cpu;
      setSquares(newSquares);
      setcurrPlayer(!human);
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  
    return null;
  };
  
  const restartGame = ()=>{
    setSquares([...Array(9).keys()].map(() => null))
    setcurrPlayer(false)  //check 2 false for O
    setGameOver(false)
  }
  return (
    <div className="gameplay">
      <div className="xo">
        <div id="x"></div>
        <div id="o"></div>
      </div>
      <div className="turn">{humanFromLocalStorage}' TURN</div>
      <button className="resetbtn" onClick={restartGame}></button>
      <div className="gamesection">
        <Square value={squares[0]} handleclick={() => XonClick(0)} />
        <Square value={squares[1]} handleclick={() => XonClick(1)} />
        <Square value={squares[2]} handleclick={() => XonClick(2)} />
        <Square value={squares[3]} handleclick={() => XonClick(3)} />
        <Square value={squares[4]} handleclick={() => XonClick(4)} />
        <Square value={squares[5]} handleclick={() => XonClick(5)} />
        <Square value={squares[6]} handleclick={() => XonClick(6)} />
        <Square value={squares[7]} handleclick={() => XonClick(7)} />
        <Square value={squares[8]} handleclick={() => XonClick(8)} />
      </div>
      <div className="scoresection">
        <div className="xscore">
          <div className="x">{humanFromLocalStorage} (YOU)</div>
          <div className="xs">0</div>
        </div>
        <div className="tie">
          <div className="tiescore">TIE</div>
          <div className="ties">0</div>
        </div>
        <div className="oscore">
          <div className="o">{cpuFromLocalStorage} (CPU)</div>
          <div className="os">0</div>
        </div>
      </div>
    </div>
  );
}

export default Gameplay;
