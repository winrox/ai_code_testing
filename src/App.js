import React from 'react';
import './App.css';
import MapComponent from './components/Map';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Human in the Loop</h1>
      </header>
      <div className="main">
        <MapComponent />
      </div>
      <Footer />
    </div>
  );
}

export default App;
