import React from 'react';
import MemoryCard from './components/MemoryCard'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        <p className="subtitle">
          Match cards to win
        </p>
      </header>
      <div className="MemoryCard gradient">
        <MemoryCard/>
        <MemoryCard/>
        <MemoryCard/>
        <MemoryCard/>
        <MemoryCard/>
        <MemoryCard/>
      </div>
    </div>
  );
}

export default App;
