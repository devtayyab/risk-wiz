import React, { useState, useEffect, useRef } from 'react';
import Chart, { InteractionMode } from 'chart.js/auto';

interface DataPoint {
  year: number;
  risk_rating: number;
}

interface LineGraphProps {
  data: { yearly_data: DataPoint[] };
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const chartContainer = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (data && !chartInstance && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      const newChartInstance = new Chart(ctx as CanvasRenderingContext2D, {
        type: 'line',
        data: {
          labels: data.yearly_data.map((point) => point.year),
          datasets: [
            {
              label: 'Risk Rating over Time',
              data: data.yearly_data.map((point) => point.risk_rating),
              backgroundColor: '#f00',
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          responsive: true,

          hover: {
            mode: 'nearest' as InteractionMode,
            intersect: true,
          },

        },
      });
      setChartInstance(newChartInstance);
    } else {
      if (data && chartInstance) {
        chartInstance.data.labels = data.yearly_data.map((point) => point.year);
        chartInstance.data.datasets[0].data = data.yearly_data.map(
          (point) => point.risk_rating
        );
        chartInstance.update();
      }
    }
  }, [chartInstance, data]);

  return (
    <div style={{ padding: 20, maxWidth: "400px" }}>
      <h1>Line Graph</h1>
      <canvas ref={chartContainer} id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default LineGraph;
