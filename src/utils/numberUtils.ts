import BigNumber from "bignumber.js";

export const BN = BigNumber.clone();
BN.set({ DECIMAL_PLACES:3 });

export const cleanUpDecimal = (num:number) => {
  return new BN(num, 10).toNumber();
};