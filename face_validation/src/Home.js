// Home.js
import React from 'react';
import './App.css'

const Home = () => {
  return (
    <div className='home'>
      <center>
      <h1>Welcome to our Face Position Validation App!</h1>
      <p>Please click on the button below to start the validation process.</p>
      <button onClick={() => window.location.href = '/capture'} className='buttton'>Start Validation</button></center>
    </div>
  );
}

export default Home;
