import {delay} from "./util";
import {Token} from "./tokens";

enum DataInterval{
    H24,
    D7,
    W1
};

interface ValueTick{
    time: number;
    value: number;
}

interface Prices{
    token1: Token;
    token2: Token;
    ticks: ValueTick[];
};

export const historicalPrices = async (token1: string, token2: string, interval: DataInterval): Promise<Prices | null> => {
    await delay(100);
    return null;
};

interface LiquidityInfo{
    current: number;
    ticks: ValueTick[];
}

export const liquidityChanges = async (): Promise<LiquidityInfo> => {
    await delay(100);
    return {
        current: 0,
        ticks: [{
            time: 0,
            value: 0
        }]
    };
};


interface VolumeInfo{
    current: number;
    ticks: ValueTick[];
}

export const volumeInfo = async (): Promise<VolumeInfo> => {
    await delay(100);
    return {
        current: 0,
        ticks: [{
            time: 0,
            value: 0
        }]
    };
};






