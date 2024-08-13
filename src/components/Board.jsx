import { useState } from "react";

function Square({value, onSquareClick }) {
      let bgColor;
      if (value === "X") {
            bgColor = "red";
      } else if(value === "O") {
            bgColor = "blue"
      }

      return (
            <button 
                  className="square" 
                  onClick={onSquareClick}
                  style={{
                        backgroundColor: bgColor
                  }}
            >
                  {value}
            </button>
      );
}

export default function Board() {
      const [xIsNext, setXIsNext] = useState(true);
      const [squares, setSquares] = useState(Array(9).fill(null));

      function handleClick(i) {
            const nextSquares = squares.slice();

            if (squares[i] || calculateWinner(squares)) return;

            nextSquares[i] = xIsNext ? "X" : "O";

            setSquares(nextSquares);
            setXIsNext(!xIsNext);
      }

      let winner = calculateWinner(squares);
      let status;

      if (winner) {
            status = "Winner: " + winner;

      } else {
            status = "Next Player: " + (xIsNext ? "X" : "O");
      }

      return (
            <>
            <div className="board-row">
                  <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                  <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                  <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>

            <div className="board-row">
                  <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                  <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                  <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>

            <div className="board-row">
                  <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                  <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                  <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
            <div className="status"
                  style={{
                        color: "white",
                  }}>
                        {status}
                  </div>
            </>
      );
}

function calculateWinner(squares) {
      const winCombo = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
      ];

      for (let i=0; i<winCombo.length; i++ ) {
            const [a,b,c] = winCombo[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                  return squares[a];
            }
      }

      return null;
}
