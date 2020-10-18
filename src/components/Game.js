import React, { useState } from 'react';
import Board from './Board';

const styles = {
  width: '200px',
  margin: '20px auto'
};

 function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  
  const winner = calculateWinner(history[stepNumber]);
  //console.log(winner)
  const [player1Result, setPlayer1Result] = useState(0)
  const [player2Result, setPlayer2Result] = useState(0)

  const handleClick = i => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
   // console.log(player1)

    if (winner || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const winnerResult = () => {
    if (winner && winner === 'X') { 
    alert('Winner: ' +  player1) 
     setPlayer1Result(player1Result+1)
  }
     else if (winner && winner === 'O') { 
      alert('Winner: ' +  player2) 
      setPlayer2Result(player2Result+1)
      }
     
    }


  return (
    <>
    <div style={{ flexDirection: 'column'}}>
      <div>
    <label>
      Enter layer 1 name: 
      <br/><br/>
    <input type = "text" onChange={event => setPlayer1(event.target.value)}/>
    <br/><br/>
    Result:  {player1Result}
    <br/><br/>
    </label>
    </div>
    <div>
    <label>
      Enter player 2 name: 
      <br/><br/>
    <input type = "text" onChange={event => setPlayer2(event.target.value)}/> 
    <br/><br/>
    Result:  {player2Result}
    </label>
    </div>
    </div>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div style={styles}>
        <button onClick={() => jumpTo(0)}>Play Again</button>
        <button onClick={() => jumpTo(0)}>Reset</button>
      </div>
    </>
  );
};

export default Game;