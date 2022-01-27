import {delay} from "./util";

interface ConversionInfo{
    fwd: number;
    bwd: number;
};

export const conversionRate = async (token1: string, token2: string): Promise<ConversionInfo> => {
    await delay(100);
    return {
        fwd: 0.4,
        bwd: 1/0.4
    }
};

export const estimateSwapFee = async (value: number, token1: string, token2: string): Promise<number> => {
    await delay(100);
    return value * 0.01
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
    }
};

export const confirmSwap = async (input: SwapInput): Promise<void> => {
    await delay(100);
};

