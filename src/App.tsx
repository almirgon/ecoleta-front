import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router} from 'react-router-dom'

import Routes from './routes';

function App() {
  return <div className="App">
    <Router><Header />
    <main className="AppBody">
      <Routes />
    </main><Footer/></Router>
    
</div>;
}

export default App;
