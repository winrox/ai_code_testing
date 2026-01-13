import React from 'react';
import './App.css';
import { FaRobot } from 'react-icons/fa';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to the Homepage</h1>
        <p>This app was created by a human with as much help from Copilot as possible.</p>
      </header>
      <footer className="app-footer">
        <p>
          This page was created using <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">GitHub Copilot&nbsp;<FaRobot className="copilot-icon" /></a>
        </p>
      </footer>
    </div>
  );
}

export default App;
