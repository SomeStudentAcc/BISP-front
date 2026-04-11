// types/statistics/statistics.types.ts

export interface IStatisticsCounts {
  totalProducts: number;
  totalWarehouses: number;
  totalDillers: number;
  totalExports: number;
}

export interface IStatisticsStock {
  totalStock: number;
  totalExported: number;
}

export interface IStatistics {
  counts: IStatisticsCounts;
  stock: IStatisticsStock;
  exportsByMonth: Record<string, number>;
}
