import { TokenBalanced } from "./tokens";

export interface LiquidityState {
    panel: "main"|"add"|"remove";
    from: TokenBalanced|null;
    to: TokenBalanced|null;
    inputs: {
        from:number;
        to:number;
    },
    selectionModal: "from"|"to"|null;
    conversionRate: number;
}