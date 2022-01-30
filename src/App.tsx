import React, { useEffect } from "react";
import {
  Route, Routes
} from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Modals from "./components/Modals";
import Notifications from "./components/Notifications";
import LiquidityPage from "./pages/Liquidity";
import NotFound from "./pages/NotFound";
import SwapPage from "./pages/Swap";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectAccount } from "./redux/reducers/account";
import { retrieveTokens } from "./redux/reducers/tokens";

function App() {


  const { walletAddress } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(retrieveTokens( walletAddress ));
  }, [dispatch, walletAddress]);

  return (
    <div className="layout">
      <Header/>
      <div className="pageContent">
        <Routes>
          <Route path="/" element={<SwapPage/>}/>
          <Route path="/liquidity" element={<LiquidityPage />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
      <Modals/>
      <Notifications />
    </div>
  );
}

export default App;
