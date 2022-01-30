import { PoolPositionInfo } from "../../api/pool";
import { TokenBalanced } from "./tokens";

export interface LiquidityState {
    panel: "main"|"add"|"remove";
    token1: TokenBalanced|null;
    token2: TokenBalanced|null;
    inputs: {
        token1:number;
        token2:number;
    },
    selectionModal: "token1"|"token2"|null;
    conversionRate: number;
    removePercentage: string;
    add: AddLiquidityState;
    liquidity: PoolPositionInfo[] | null;
}

interface AddLiquidityState {
    token1: boolean;
    token2: boolean;
    position: PoolPositionInfo|null;
}