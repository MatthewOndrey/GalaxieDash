import React, { useState, useEffect } from "react";
import './fonts/house.otf';
import './App.css';
import Dashboard from './components/Dashboard.js';
import registerServiceWorker from './registerServiceWorker';

function App() {
    registerServiceWorker();
  return (
    <div className="App">
            <Dashboard />
    </div>

  );
}

export default App;
