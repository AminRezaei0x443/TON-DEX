import BigNumber from "bignumber.js";

export const BN = BigNumber.clone();
BN.set({ DECIMAL_PLACES:3 });

export const cleanUpDecimal = (num:number) => {
  return new BN(num, 10).toNumber();
};

const SYMBOL = ["", "k", "m", "b", "t"];
export const abbreviateNumber = (num:number) =>{

  const tier = Math.log10(Math.abs(num)) / 3 | 0;

  if(tier === 0) return num;

  const suffix = SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = num / scale;

  return scaled.toFixed(1) + suffix;
};

export const currencyFormatter = Intl.NumberFormat("en-US", {
  style:"currency",
  currency:"USD"
});