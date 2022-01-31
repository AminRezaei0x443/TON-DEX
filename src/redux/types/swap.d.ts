import { DataInterval, Prices } from "../../api/info";
import { TokenBalanced } from "./tokens";

export type DifferenceData = {
    increasing:boolean;
    value:string;
    percent:string;
}


export interface SwapState {
    showChart: boolean;
    from: TokenBalanced|null;
    to: TokenBalanced|null;
    inputs: {
        from:number;
        to:number;
    },
    selectionModal: "from"|"to"|null;
    conversionRate: number;
    usdtRate: number;
    chartData: Prices|null;
    timespan: DataInterval;
    chartDiff: DifferenceData;
}