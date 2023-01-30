import React from 'react'
import Game from './components/Game';
import { useMode } from './utils/hooks'
import './main.css';
import modeImage from './images/mode.png'

const styles = {
  dark: {
    background: 'black',
    color: 'white',
  },
  light: {
    background: 'white',
    color: 'black',
  }
}

function App() {
  const [mode, setMode] = useMode()
  
  return (
    <div className="main" style={styles[mode]}>
      <div className='mode-button-container'>
      <button 
        className='buttons mode-button' 
        onClick={() => setMode(mode === 'dark' ? 'light': 'dark')}
      >
        <img src={modeImage} alt="mode" className='icon' />
        <p>change mode</p>
      </button> 
      </div> 
      <Game/>
    </div>
  );
}

export default App;
