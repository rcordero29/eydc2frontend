import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Routers from './Routers';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
