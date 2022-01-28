import { DataInterval, Prices } from "../../api/info";
import { Token } from "../../api/tokens";

export interface SwapState {
    showChart: boolean;
    from: Token|null;
    to: Token|null;
    inputs: {
        from:number;
        to:number;
    },
    tokens: Token[];
    displayList: Token[];
    selectionModal: "from"|"to"|null;
    chartData: Prices|null;
    timespan: DataInterval;
}