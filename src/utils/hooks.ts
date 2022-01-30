import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectAccount } from "../redux/reducers/account";
import { TokenBalanced } from "../redux/types/tokens";

type FuncType = AsyncThunk<{
    balance1: number;
    balance2: number;
}, {
    token1?: string | undefined;
    token2?: string | undefined;
    walletAddress: string;
}, {}>

export const useInputBalanceEffect = (from: TokenBalanced|null, to: TokenBalanced|null, action: FuncType) => {
  const { walletAddress } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(walletAddress !== null){
      dispatch(action({
        token1: from?.address,
        token2: to?.address,
        walletAddress
      }));
    }
  }, [walletAddress, dispatch, from, to,action]);
};