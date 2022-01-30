import { conversionRate } from "./swap";
import { listTokens, Token, tokenInfo } from "./tokens";
import { delay, generateAddress } from "./util";

interface Pool{
    address: string;
    token1?: Token;
    token2?: Token;
    providerFee: number;
    info: PoolInfo | null;
}

interface PoolInfo{
    liquidity: number;
    volume24H: number;
    volume7D: number;
    fwdRate: number;
    bwdRate: number;
}

const _pools: Map<string, Pool> = new Map();
const _tokens_to_pool_addr: Map<string, string> = new Map();
const POOL_PER_PAGE = 10;

export const listPools = async (page: number, loadInfo: boolean = true): Promise<Pool[]> => {
  await delay(100);
  if(_pools.size == 0){
    let tokens = await listTokens(0);
    let o = tokens.length > 5 ? 5 : tokens.length;
    tokens = tokens.slice(0, o);
    for(let i = 0; i < tokens.length; i++){
      let t1 = tokens[i];
      for(let j = i; i < tokens.length; j++){
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

const _user_positions: PoolPositionInfo[] = [];

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

interface LPTokenRate{
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

export const addLiquidity = async (token1: string, token2: string, value: number): Promise<void> => {
    await delay(100);
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
        let ps = _user_positions.find(p=>p.pool?.address === pid) ?? undefined;
        if(ps){
          ps.share += share.share;
          ps.liquidityTokens += share.liquidityTokens;
          ps.token1V = value;
          ps.token2V = value * rates.fwd;
        }else{
          _user_positions.push({
            liquidityTokens: share.liquidityTokens,
            share: share.share,
            token1V: value,
            token2V: value * rates.fwd,
            pool: p
          })
        }
      }
    }
};

export const removeLiquidity = async (token1: string, token2: string, lpValue: number): Promise<void> => {
    await delay(100);
    let id1 = token1 + "_" + token2;
    let pid = _tokens_to_pool_addr.get(id1);
    if(pid){
      let p = _pools.get(pid);
      if(p){
        let ps = _user_positions.find(p=>p.pool?.address === pid) ?? undefined;
        if(ps){
          ps.liquidityTokens -= lpValue;
          if(ps.liquidityTokens === 0){
            let index = _user_positions.indexOf(ps);
            if (index > -1) {
              _user_positions.splice(index, 1);
            }
          }
        }
      }
    }
};