import { LiquidityInfo, VolumeInfo } from "../../api/info";
import { Pool } from "../../api/pool";

export interface InfoState {
    overview: PoolCharts;
    topPools: Pool[] | null;
    topPoolsSort: TopPoolSort;
    pool: Pool | null;
    poolChartType: PoolChartType;
    poolCharts: PoolCharts;
}

interface PoolCharts {
    liquidity: LiquidityInfo | null;
    volume: VolumeInfo | null;
}

export type PoolChartType = "liquidity"|"volume";

export type SortKeys = "liquidity"|"volume24H"|"volume7D";
export interface TopPoolSort {
    key: SortKeys;
    ascending: boolean;
}
