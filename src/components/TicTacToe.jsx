import React from 'react'
import { useState } from 'react'
import './TicTacToe.css'

export default function TicTacToe() {
    const [board,setBoard]=useState([
      "","","",
      "","","",
      "","",""
    ]);

    const [currentPlayer,setCurrentPlayer]=useState("X")
    const[winner,setWinner]=useState(null)

    // winning combination
    const winningPatterns=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]

    ]

    const handleClick=(index)=>{
      if(board[index]!=="" || winner !==null){
        return;
      }
    

    // copy board
    const newBoard=[...board];

    // Place x or o
    newBoard[index]=currentPlayer;

    setBoard(newBoard);

    let won=winningPatterns.some((pattern)=>{
      return (
        newBoard[pattern[0]]!=="" &&
        newBoard[pattern[0]]===newBoard[pattern[1]]&&
        newBoard[pattern[1]]===newBoard[pattern[2]]
      );
    })

    if(won){
      setWinner(currentPlayer);
    }
    else if(newBoard.every((cell)=>cell!=="")){
      setWinner("Draw");
    }

    else{
      setCurrentPlayer(
        currentPlayer==="X"?"O":"X");
    };
    }  
    // resetboard
    const resetGame=()=>{
      setBoard([
        "","","",
        "","","",
        "","",""
      ]);
      setCurrentPlayer("X");
      setWinner(null);
    }

  return (
    <div className='Game-container'>
      <div className="game-card">
        <h1>Tic Tac Toe (Or) XO Game</h1>
        <p className="turn">
          {winner===null?
          `Player:${currentPlayer}'s turn`:
          winner==="Draw"?
          "It's a Draw🤝":`Player:${winner} wins!🎉`}
        
        </p>

        <div className="game-board">
          {board.map((value,index)=>(
            <button key={index} className="box" onClick={()=>handleClick(index)}
            disabled={value!=="" ||winner!==null}>{value}
            </button>
          ))}
        </div>  

        <button className="reset-btn" onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  )
}

