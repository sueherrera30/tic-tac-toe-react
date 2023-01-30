import * as React from 'react'

import Board from './Board';
import { useLocalStorageState } from '../utils/hooks'
import { calculateNextValue, calculateWinner, calculateStatus} from '../utils'
import '../index.css';
import pusheen from '../images/pusheen2.png'
import pusheenWin from '../images/pusheen1.png'

const Game = () => {
    const [stepState, setStep] = useLocalStorageState('step', 0);
    const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
      Array(9).fill(null),
    ])
    const currentSquares = history[stepState]
    const nextValue = calculateNextValue(currentSquares)
    const winner = calculateWinner(currentSquares)
    const status = calculateStatus(winner, currentSquares,nextValue)
    
    function selectSquare(square) {
      if(winner || currentSquares[square]) return
        const newHistory = history.slice(0, stepState + 1)
        const squaresCopy = [...currentSquares];
        squaresCopy[square] = nextValue
        setHistory([...newHistory, squaresCopy])
        setStep(newHistory.length)
    }
    function restart() {
      setHistory([Array(9).fill(null)])
      setStep(0)
    }
  
    const moves = history.map((stepSquare, step) => {
      const text = step === 0   ? 'Go to game start' : `Go to move #${step}`
      const current = step === stepState
      return (
      <li key={step}>
        <button className='buttons' disabled={current} onClick={() => {
          setStep(step)
        }}>
          { text}{current ? 'Current' : null}
        </button>
      </li>
    )})

    return (
     <>
      <div className="game">
          <div className="game-board">
            <Board onClick={selectSquare} squares={currentSquares} />
            <button className="restart" onClick={restart}>
            restart
            </button>
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
        <div className='image-container'>
          {
            winner 
            ? <div className='pusheen'>
                <p>well done dear {winner}</p>
                <img src={pusheenWin} alt="pusheenCool" className='image' />
              </div>
            : <img src={pusheen} alt="pusheen" className='image' />
          }
      </div>
     </>
    )
}

export default Game;