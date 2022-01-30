import { DataInterval, Prices } from "../../api/info";
import { Token } from "../../api/tokens";

export type DifferenceData = {
    increasing:boolean;
    value:string;
    percent:string;
}


export interface SwapState {
    showChart: boolean;
    from: Token|null;
    to: Token|null;
    inputs: {
        from:number;
        to:number;
    },
    selectionModal: "from"|"to"|null;
    chartData: Prices|null;
    timespan: DataInterval;
    conversionRate: number;
    usdtRate: number;
    chartDiff: DifferenceData;
}