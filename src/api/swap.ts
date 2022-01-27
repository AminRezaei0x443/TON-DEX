import { delay } from "./util";

interface ConversionInfo{
    fwd: number;
    bwd: number;
};

const _ratesCache: Map<string, Map<string, number>> = new Map();

export const conversionRate = async (token1: string, token2: string): Promise<ConversionInfo> => {
  await delay(100);
  let rate = _ratesCache.get(token1)?.get(token2);
  if(!rate){
    rate = Math.random();
    let tR = _ratesCache.get(token1);
    if(!tR){
      _ratesCache.set(token1, new Map());
    }
    tR = _ratesCache.get(token2);
    if(!tR){
      _ratesCache.set(token2, new Map());
    }
    _ratesCache.get(token1)?.set(token2, rate);
    _ratesCache.get(token2)?.set(token1, 1/rate);
  }
  return {
    fwd: rate,
    bwd: 1/rate
  };
};

export const estimateSwapFee = async (value: number, token1: string, token2: string): Promise<number> => {
  await delay(100);
  return value * 0.01;
};

interface SwapInfo{
    estimatedOutput: number;
    minimumOutput: number;
    price: number;
    priceImpact: number;
    providerFee: number;
};

interface SwapInput{
    token1: string;
    token2: string;
    value: number;
    slippage?: number;
    deadline?: number;
    multihop?: boolean;
};

export const swapInfo = async (input: SwapInput): Promise<SwapInfo> => {
  await delay(100);
  return {
    estimatedOutput: 0,
    minimumOutput: 0,
    price: 0,
    priceImpact: 0,
    providerFee: 0
  };
};

export const confirmSwap = async (input: SwapInput): Promise<void> => {
  await delay(100);
};

