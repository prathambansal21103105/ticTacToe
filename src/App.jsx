import React, { useState } from 'react';
import Player from "./components/Player"
import GameBoard from "./components/GameBoard";
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS={
  'X':'Player1',
  'Y':'Player2'
}

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

const deriveActivePlayer=(gameTurns)=>{
  let currentPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='O';
  }
  return currentPlayer;
}

const deriveGameBoard=(gameTurns)=>{
  let gameBoard=[...initialGameBoard.map(array=>[...array])];
  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col}=square;
      gameBoard[row][col]=player;
  }
  return gameBoard;
}

const deriveWinner=(gameBoard,players)=>{
  let winner=null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }
  }
  return winner;
}

const App=()=>{
  const [players,setPlayers]=useState(PLAYERS);
  const [gameTurns,setGameTurns]=useState([]);

  const activePlayer=deriveActivePlayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard,players);
  const hasDraw=gameTurns.length===9 && !winner;

  const handleSelectSquare=(rowIndex,colIndex)=>{
    setGameTurns((prevTurns)=>{
      const currentPlayer=deriveActivePlayer(prevTurns);
      const updatedTurns=[{ square:{row:rowIndex, col:colIndex}, player:currentPlayer }, 
        ...prevTurns
      ];
      return updatedTurns;
    });
  }
  const handleRematch=()=>{
    setGameTurns([]);
  }
  const handlePlayerNameChange=(symbol,newName)=>{
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,[symbol]:newName
      };
    })
  }
  return (
    <div>
      <header>
        <img src="game-logo.png" alt="hand-drawn-logo" />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <main>
        <div id="game-container">
          <ol id="players" className='highlight-player'>
            <Player initialName={PLAYERS.X} initialSymbol='X' isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
            <Player initialName={PLAYERS.Y} initialSymbol='O' isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
          <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard}/>
        </div>
        <Log gameTurns={gameTurns}/>
      </main>
    </div>
  )
}
export default App;