import { LiquidityInfo, VolumeInfo } from "../../api/info";

export interface InfoState {
    overview: OverviewState;
    topPools: Pool[] | null;
}

interface OverviewState {
    liquidity: LiquidityInfo | null;
    volume: VolumeInfo | null;
}