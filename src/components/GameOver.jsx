export default function GameOver({ winner, restart }) {
  return (
    <div id='game-over'>
      <h2>GAME OVER!</h2>
      {winner && <p>{winner} WON</p>}
      {!winner && <p>DRAW</p>}

      <p>
        <button onClick={restart}>Remach!</button>
      </p>
    </div>
  );
}
