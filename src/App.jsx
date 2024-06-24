import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './Winning-Combinations';
import { useState } from 'react';

let PLAYERS = {
  X: 'player 1',
  Y: 'player 2',
};

function deriveActivePlayer(S) {
  let currentPlayer = 'X';
  if (S.length > 0 && S[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  let [gameTurns, setGameTurns] = useState([]);

  let [players, setPlayers] = useState(PLAYERS);

  function deriveWinner(gameBoard, players) {
    let winner;

    for (let combination of WINNING_COMBINATIONS) {
      let firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      let secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      let thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column];

      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = players[firstSquareSymbol];
      }
    }

    return winner;
  }

  function deriveGameBoard(gameTurns) {
    let gameBoard = [...initialGameBoard.map((array) => [...array])];

    for (let turn of gameTurns) {
      let { square, player } = turn;
      let { row, col } = square;

      gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      let updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  let gameBoard = deriveGameBoard(gameTurns);
  let activePlayer = deriveActivePlayer(gameTurns);
  let winner = deriveWinner(gameBoard, players);
  let draw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbole='X'
            isActive={activePlayer === 'X' ? 'active' : undefined}
            changeName={handlePlayerNameChange}
            isSelected={gameTurns.length !== 0}
          />

          <Player
            initialName={PLAYERS.Y}
            symbole='O'
            isActive={activePlayer === 'O' ? 'active' : undefined}
            changeName={handlePlayerNameChange}
            isSelected={gameTurns.length !== 0}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          winnerPlayer={winner}
        />
      </div>
      <Log turns={gameTurns} />
      {(winner || draw) && <GameOver winner={winner} restart={handleRestart} />}
    </main>
  );
}

export default App;
