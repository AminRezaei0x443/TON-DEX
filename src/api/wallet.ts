import {delay} from "./util";

const FAKE_WALLET_ADDRESS = "EQBfe85YE_7ECghMoHfQA1XViX3KSxj98Kyb8cyNv8vKGEr1";

export class WalletConnector{
  static STATE_ACTIVE = 1;
  static STATE_INACTIVE = 0;
  state: number;
  constructor(){
    this.state = WalletConnector.STATE_INACTIVE;
  }
  
  activate = async (): Promise<{account: string}> => {
    await delay(100);
    return {
      account: FAKE_WALLET_ADDRESS
    }
  }

  getAccount = async () : Promise<null | string> => {
    await delay(100);
    if(this.state == WalletConnector.STATE_INACTIVE){
      return null;
    }
    return FAKE_WALLET_ADDRESS;
  } 

  reset = () => {
    return null;
  };
}

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