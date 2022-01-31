import { LiquidityInfo, VolumeInfo } from "../../api/info";

export interface InfoState {
    overview: OverviewState;
}

interface OverviewState {
    liquidity: LiquidityInfo | null;
    volume: VolumeInfo | null;
}