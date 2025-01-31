import React, { useState } from "react";

export default function Board() {
  const [Current, setCurrent] = useState<"X" | "O">("X");
  const [sq, setsq] = useState<Array<"X" | "O" | "">>(Array(9).fill(""));
  const [winner, setWinner] = useState<"X" | "O" | "Draw" | null>(null);
  const [Pop, setPop] = useState(false);
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winPop = () => {
    setPop(!Pop);
  };

  const checkWinner = (squares: Array<"X" | "O" | "">) => {
    for (const [a, b, c] of winningCombinations) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    if (squares.every((square) => square !== "")) {
      return "Draw";
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (sq[index] !== "" || winner) return;

    const newSquares = [...sq];
    newSquares[index] = Current;
    setsq(newSquares);
    const win = checkWinner(newSquares);
    if (win) {
      setWinner(win);
      winPop();
    } else {
      setCurrent(Current === "X" ? "O" : "X");
    }
  };

  const restartGame = () => {
    setCurrent("X");
    setsq(Array(9).fill(""));
    setPop(false);
    setWinner(null);
  };

  return (
    <div className="h-screen flex flex-col items-center ">
      <h1 className="text-3xl font-bold p-10">Tic-Tac-Toe</h1>
      {winner ? (
        <p className="text-xl p-5">
          {winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`}
        </p>
      ) : (
        <p className="text-xl p-5">Hey {Current}, it is your turn.</p>
      )}
      <div className="grid p-10 gap-3 grid-cols-3">
        {sq.map((value, index) => (
          <button
            key={index}
            className={`w-24 h-24 flex items-center justify-center text-xl font-bold 
                ${
                  value === "X"
                    ? "bg-red-500 transition-colors"
                    : value === "O"
                    ? "bg-green-500 transition-colors"
                    : "bg-blue-300"
                }`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button
        className="bg-blue-600 p-2 rounded-xl text-lg text-white"
        onClick={restartGame}
      >
        Restart
      </button>

      <div className="flex items-center justify-center min-h-screen">
        {Pop ? (
          <div className="flex p-5 rounded-lg bg-white/85 shadow-md shadow-slate-500 drop-shadow-2xl fixed top-1/3 flex-col items-center justify-center">
            <h1 className="p-10 text-xl">
              {winner === "Draw" ? "It's a Draw!" : `${winner} won the game`}
            </h1>
            <button
              className="bg-blue-600/90 p-2 rounded-xl text-lg text-white"
              onClick={restartGame}
            >
              New Game
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
