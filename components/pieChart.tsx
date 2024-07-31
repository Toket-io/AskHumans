// components/PieChart.tsx
import Chart from "chart.js/auto";
import React, { useRef, useEffect } from "react";

interface PieChartProps {
  data: number[];
  labels: string[];
  title: string;
  chartId: string;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  labels,
  title,
  chartId,
}) => {
  const canvas = useRef();

  useEffect(() => {
    const ctx = canvas.current;

    let chartStatus = Chart.getChart(chartId);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    if (ctx) {
      const chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          // datasets: data,
          datasets: [
            {
              // label: "Dataset 1",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: title,
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className="container">
      <canvas id={chartId} ref={canvas}></canvas>
    </div>
  );
};
export default PieChart;
