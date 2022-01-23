import React from "react";
import {
  Route, Routes
} from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import SwapPage from "./pages/Swap";

function App() {
  return (
    <div className="layout">
      <Header/>
      <div className="pageContent">
        <Routes>
          <Route path="/" element={<SwapPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
