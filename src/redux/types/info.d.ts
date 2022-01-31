import { LiquidityInfo, VolumeInfo } from "../../api/info";
import { Pool } from "../../api/pool";

export interface InfoState {
    overview: OverviewState;
    topPools: Pool[] | null;
    topPoolsSort: TopPoolSort;
}

interface OverviewState {
    liquidity: LiquidityInfo | null;
    volume: VolumeInfo | null;
}

export type SortKeys = "liquidity"|"volume24H"|"volume7D";
export interface TopPoolSort {
    key: SortKeys;
    ascending: boolean;
}