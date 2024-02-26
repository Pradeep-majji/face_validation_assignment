import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import WebcamCapture from './WebcamCapture';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capture" element={<WebcamCapture />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
