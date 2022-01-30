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
  return value * 0.0001;
};

interface SwapInfo{
    estimatedOutput: number;
    minimumOutput: number;
    price: number;
    priceImpact: number;
    providerFee: number;
};

interface TokenInput{
    token1: string;
    token2: string;
    value: number;
    slippage?: number;
    deadline?: number;
    multihop?: boolean;
};

export const swapInfo = async (input: TokenInput): Promise<SwapInfo> => {
  await delay(100);
  let rate = await conversionRate(input.token1, input.token2);
  // %0.1
  let priceImpact = 0.1 / 100;
  let maxSlippage = input.slippage ?? 0.5 / 100;
  let fee = await estimateSwapFee(input.value, input.token1, input.token2);
  let allowedMovement = rate.fwd * maxSlippage;
  let min = (rate.fwd - allowedMovement) * input.value;
  let est = (1 - priceImpact) * rate.fwd * input.value;
  return {
    estimatedOutput: est,
    minimumOutput: min,
    price: rate.fwd,
    priceImpact,
    providerFee: fee
  };
};

export const confirmSwap = async (input: TokenInput): Promise<void> => {
  await delay(100);
};

