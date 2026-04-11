// app/statistics/page.tsx
import axiosInstance from "@/axios";
import { IStatistics } from "@/types/statistics/statistics.types";
import StatisticsCharts from "./StatisticsCharts";

const getStatistics = async (): Promise<IStatistics | null> => {
  try {
    const res = await axiosInstance.get<IStatistics>("/statistics");
    return res.data;
  } catch {
    return null;
  }
};

export default async function StatisticsPage() {
  const stats = await getStatistics();

  if (!stats) return <div>Failed to load statistics</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-medium">Statistics</h1>
      <StatisticsCharts stats={stats} />
    </div>
  );
}
