import React from 'react';
import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router} from 'react-router-dom'

import Routes from './routes';

function App() {
  return <div className="App">
    <Router><Header />
    <main className="AppBody">
      <Routes />
    </main></Router>
    
</div>;
}

export default App;
