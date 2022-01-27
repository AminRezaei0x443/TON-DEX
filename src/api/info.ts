import { conversionRate } from "./swap";
import { Token, tokenInfo } from "./tokens";
import { delay } from "./util";

enum DataInterval{
    H24,
    W1,
    M1
};

interface ValueTick{
    time: number;
    value: number;
}

interface Prices{
    token1: Token|null;
    token2: Token|null;
    ticks: ValueTick[];
};

const _intervalMs = {
  [DataInterval.H24]: 24 * 60 * 60 * 1000,
  [DataInterval.W1]: 7 * 24 * 60 * 60 * 1000,
  [DataInterval.M1]: 30 * 24 * 60 * 60 * 1000,
};

export const historicalPrices = async (token1: string, token2: string, interval: DataInterval): Promise<Prices | null> => {
  await delay(100);
  let t1 = await tokenInfo(token1);
  let t2 = await tokenInfo(token1);
  let { fwd, bwd } = await conversionRate(token1, token2);
  let ticks: ValueTick[] = [{
    time: new Date().getUTCMilliseconds(),
    value: fwd,
  }];
  let maxChange = 5;
  for(let i = 0; i < 24; i++){
    let lastTick = ticks[0];
    let change = (Math.random() * maxChange * 2) - maxChange;
    change /= 100;
    let mult = 1 - change;
    ticks.unshift({
      time: lastTick.time - _intervalMs[interval],
      value: lastTick.value * mult
    });
  }
  return {
    token1: t1,
    token2: t2,
    ticks: ticks
  };
};

interface LiquidityInfo{
    current: number;
    ticks: ValueTick[];
}

export const liquidityChanges = async (): Promise<LiquidityInfo> => {
  await delay(100);
  let current = 602.132455 * 1e6;
  let ticks: ValueTick[] = [{
    time: new Date().getUTCMilliseconds(),
    value: current,
  }];
  let maxChange = 2;
  for(let i = 0; i < 24; i++){
    let lastTick = ticks[0];
    let change = (Math.random() * maxChange * 2) - maxChange;
    change /= 100;
    let mult = 1 - change;
    ticks.unshift({
      time: lastTick.time - _intervalMs[DataInterval.H24],
      value: lastTick.value * mult
    });
  }
  return {
    current,
    ticks
  };
};


interface VolumeInfo{
    current: number;
    ticks: ValueTick[];
}

export const volumeInfo = async (): Promise<VolumeInfo> => {
  await delay(100);
  let current = 81.267915 * 1e6;
  let ticks: ValueTick[] = [{
    time: new Date().getUTCMilliseconds(),
    value: current,
  }];
  let maxChange = 4;
  for(let i = 0; i < 24; i++){
    let lastTick = ticks[0];
    let change = (Math.random() * maxChange * 2) - maxChange;
    change /= 100;
    let mult = 1 - change;
    ticks.unshift({
      time: lastTick.time - _intervalMs[DataInterval.H24],
      value: lastTick.value * mult
    });
  }
  return {
    current,
    ticks
  };
};






