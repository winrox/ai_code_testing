import React from 'react';
import './App.css';
import MapComponent from './components/Map';
import { ReactComponent as CoPilotText } from './assets//githubcopilot-text.svg';
import { ReactComponent as CoPilotIcon } from './assets/githubcopilot-icon.svg';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Human in the Loop</h1>
      </header>
      <div className="main">
        <MapComponent />
      </div>
      <footer className="app-footer">
        <p>
          This page was created using&nbsp;
          <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" className="copilot-link
          ">
            <CoPilotText className="copilot-text-icon" />
            &nbsp;
            <CoPilotIcon className="copilot-icon" style={{ fontSize: '1.4rem', verticalAlign: 'middle' }} />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
