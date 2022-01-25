const FAKE_WALLET_ADDRESS = "ASDASDM43M4K2N34O23NNDFDSF32423223";

export const connectWallet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(FAKE_WALLET_ADDRESS),1500);
  });
};

export const disconnectWallet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null),1500);
  });
};