"use client";

import { IStatistics } from "@/types/statistics/statistics.types";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface Props {
  stats: IStatistics;
}

export default function StatisticsCharts({ stats }: Props) {
  const stockRef = useRef<HTMLCanvasElement>(null);
  const monthRef = useRef<HTMLCanvasElement>(null);
  const stockChart = useRef<Chart | null>(null);
  const monthChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!stockRef.current || !monthRef.current) return;

    stockChart.current?.destroy();
    monthChart.current?.destroy();

    stockChart.current = new Chart(stockRef.current, {
      type: "bar",
      data: {
        labels: ["Stock"],
        datasets: [
          {
            label: "Total stock",
            data: [stats.stock.totalStock],
            backgroundColor: "#378ADD",
            borderRadius: 6,
          },
          {
            label: "Exported",
            data: [stats.stock.totalExported],
            backgroundColor: "#D4537E",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true },
        },
      },
    });

    monthChart.current = new Chart(monthRef.current, {
      type: "line",
      data: {
        labels: Object.keys(stats.exportsByMonth),
        datasets: [
          {
            label: "Exports",
            data: Object.values(stats.exportsByMonth),
            borderColor: "#1D9E75",
            backgroundColor: "rgba(29,158,117,0.08)",
            pointBackgroundColor: "#1D9E75",
            pointRadius: 4,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { autoSkip: false, maxRotation: 30 },
          },
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
      },
    });

    return () => {
      stockChart.current?.destroy();
      monthChart.current?.destroy();
    };
  }, [stats]);

  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total products", value: stats.counts.totalProducts },
          { label: "Total warehouses", value: stats.counts.totalWarehouses },
          { label: "Total dillers", value: stats.counts.totalDillers },
          { label: "Total exports", value: stats.counts.totalExports },
        ].map((item) => (
          <div key={item.label} className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
            <p className="text-2xl font-medium">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 space-y-3">
          <p className="text-sm text-muted-foreground">Stock overview</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
              Total stock {stats.stock.totalStock}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-pink-500 inline-block" />
              Exported {stats.stock.totalExported}
            </span>
          </div>
          <div className="relative h-48">
            <canvas ref={stockRef} />
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <p className="text-sm text-muted-foreground">Exports by month</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
              Exports
            </span>
          </div>
          <div className="relative h-48">
            <canvas ref={monthRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
