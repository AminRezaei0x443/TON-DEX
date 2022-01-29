import { Token } from "./tokens";
import { delay } from "./util";

interface Pool{
    address: string;
    token1: Token;
    token2: Token;
    providerFee: number;
    info: PoolInfo | null;
}

interface PoolInfo{
    liquidity: number;
    volume24H: number;
    volume7D: number;
    fwdRate: number;
    bwdRate: number;
}

export const listPools = async (page: number, loadInfo: boolean = true): Promise<Pool[]> => {
  await delay(100);
  return [];
};

export interface PoolPositionInfo{
    pool?: Pool;
    liquidityTokens: number;
    share: number;
};

export const listPositions = async (address: string): Promise<PoolPositionInfo[]> => {
  await delay(100);
  return [];
};

export const calculateShare = async (pool: string, value: number) : Promise<PoolPositionInfo> => {
  await delay(100);
  return {
    liquidityTokens: 0,
    share: 0
  };
};

interface LPTokenRate{
    token1: number;
    token2: number;
}

export const lpTokenRate = async (pool: string, value: number): Promise<LPTokenRate> => {
  await delay(100);
  return {
    token1: 0,
    token2: 0
  };
};

export const addLiquidity = async (pool: string, value: number): Promise<void> => {

};

export const removeLiquidity = async (pool: string, value: number): Promise<void> => {

};