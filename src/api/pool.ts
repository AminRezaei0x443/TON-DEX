import { conversionRate } from "./swap";
import { listTokens, Token, tokenInfo } from "./tokens";
import { delay, generateAddress } from "./util";

export interface Pool{
    address: string;
    token1?: Token;
    token2?: Token;
    providerFee: number;
    info: PoolInfo | null;
}

interface PoolInfo{
    liquidity?: number;
    volume24H?: number;
    volume7D?: number;
    fwdRate: number;
    bwdRate: number;
}

const _pools: Map<string, Pool> = new Map();
const _tokens_to_pool_addr: Map<string, string> = new Map();
const POOL_PER_PAGE = 10;

export const listPools = async (page: number, loadInfo: boolean = true): Promise<Pool[]> => {
  await delay(100);
  if(_pools.size === 0){
    let tokens = await listTokens(0);
    let o = tokens.length > 5 ? 5 : tokens.length;
    tokens = tokens.slice(0, o);
    for(let i = 0; i < tokens.length; i++){
      let t1 = tokens[i];
      for(let j = i+1; j < tokens.length; j++){
        let t2 = tokens[j];
        let id1 = t1.address + "_" + t2.address;
        let id2 = t2.address + "_" + t1.address;
        if(!_tokens_to_pool_addr.has(id1) && !_tokens_to_pool_addr.has(id2)){
          let rates = await conversionRate(t1.address, t2.address);
          let np: Pool = {
            address: generateAddress(),
            info: loadInfo ? {
              fwdRate: rates.fwd,
              bwdRate: rates.bwd,
              liquidity: Math.random() * 1e8,
              volume24H: Math.random() * 1e7,
              volume7D: Math.random() * 1e8 * 2
            }: null,
            providerFee: 0.0002,
            token1: t1,
            token2: t2,
          };
          _pools.set(np.address, np);
          _tokens_to_pool_addr.set(id1, np.address);
          _tokens_to_pool_addr.set(id2, np.address);
        }
      }
    }
  }
  let offset = page === -1 ? 0 : page * POOL_PER_PAGE;
  let count = page === -1 ? _pools.size : POOL_PER_PAGE;
  return Array.from(_pools.values()).slice(offset).slice(0, count);
};

export interface PoolPositionInfo{
    pool?: Pool;
    token1V?: number;
    token2V?: number;
    liquidityTokens: number;
    share: number;
};

let _user_positions: PoolPositionInfo[] = [];

export const listPositions = async (address: string): Promise<PoolPositionInfo[]> => {
  await delay(100);
  return _user_positions;
};

export const calculateShare = async (token1: string, token2: string, value: number) : Promise<PoolPositionInfo> => {
  await delay(100);
  return {
    liquidityTokens: value * 4.24,
    share: Math.random() / 10
  };
};

export interface LPTokenRate{
    token1: number;
    token2: number;
}

export const lpTokenRate = async (token1: string, token2: string, value: number): Promise<LPTokenRate> => {
  await delay(100);
  return {
    token1: Math.random() * 10,
    token2: Math.random() * 10
  };
};

export const addLiquidity = async (token1: string, token2: string, value: number) :Promise<boolean> => {
  let share = await calculateShare(token1, token2, value);
  let rates = await conversionRate(token1, token2);

  let id1 = token1 + "_" + token2;
  let id2 = token2 + "_" + token1;
  if(!_tokens_to_pool_addr.has(id1) && !_tokens_to_pool_addr.has(id2)){
    let np: Pool = {
      address: generateAddress(),
      info: null,
      providerFee: 0.0002,
      token1: await tokenInfo(token1),
      token2: await tokenInfo(token2),
    };
    _pools.set(np.address, np);
    _tokens_to_pool_addr.set(id1, np.address);
    _tokens_to_pool_addr.set(id2, np.address);
  }

  let pid = _tokens_to_pool_addr.get(id1);

  if(pid){
    let p = _pools.get(pid);

    if(p){
      let ps = _user_positions.findIndex(p=>p.pool?.address === pid);
      if(ps !== -1){
        const oldPosition = _user_positions[ps];
        const newPosition = {
          ...oldPosition,
          share: oldPosition.share + share.share,
          liquidityTokens: oldPosition.liquidityTokens + share.liquidityTokens,
          token1V: value,
          token2V: value * rates.fwd,
        };

        _user_positions = [..._user_positions.slice(0, ps),newPosition, ..._user_positions.slice(ps+1)];

      }else{
        const rate = await conversionRate(token1, token2);
        p.info = {
          fwdRate: rate.fwd,
          bwdRate: rate.bwd,
        };
        const newPosition: PoolPositionInfo = {
          liquidityTokens: share.liquidityTokens,
          share: share.share,
          token1V: value,
          token2V: value * rates.fwd,
          pool: p
        };
        _user_positions = [..._user_positions , newPosition];
      }
    }
  }
  await delay(100);
  return true;
};

export const removeLiquidity = async (token1: string, token2: string, lpValue: number): Promise<boolean> => {
  let id1 = token1 + "_" + token2;
  let pid = _tokens_to_pool_addr.get(id1);
  if(pid){
    let p = _pools.get(pid);
    if(p){
      let ps = _user_positions.findIndex(p=>p.pool?.address === pid);
      if (ps === -1) return false;

      let psElement = _user_positions[ps];
      console.log({ lt: psElement.liquidityTokens, lpValue });

      psElement = {
        ...psElement,
        liquidityTokens: psElement.liquidityTokens - lpValue
      };

      console.log({ lt: psElement.liquidityTokens, lpValue });
      if(psElement.liquidityTokens <= 0){
        _user_positions = [..._user_positions.slice(0, ps), ..._user_positions.slice(ps+1)];
      }else{
        _user_positions = [..._user_positions.slice(0, ps), psElement, ..._user_positions.slice(ps+1)];
      }
    }
  }
  await delay(100);
  return true;
};

export const approveTokenAccess = async (address: string, token: string): Promise<boolean> => {
  await delay(100);
  return true;
};
export const removeApproval = async (address: string, token1: string, token2: string): Promise<boolean> => {
  await delay(100);
  return true;
};

export const getPool = async (id: string): Promise<Pool|null> => {
  await delay(100);
  return _pools.get(id) ?? null;
};
