import React from 'react';
import {
  Route, Routes
} from "react-router-dom";
import './App.scss';
import Header from './components/Header';

function App() {
  return (
    <div className="layout">
      <Header/>
      <Routes>
        <Route path="/" />
      </Routes>
    </div>
  );
}

export default App;
