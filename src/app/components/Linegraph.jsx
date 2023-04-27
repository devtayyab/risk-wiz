"use client"
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({ data }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!chartInstance) {
      const ctx = document.getElementById('myChart').getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((point) => point.year),
          datasets: [
            {
              label: 'Risk Rating over Time',
              data: data.map((point) => point.riskRating),
              backgroundColor: '#f00'
            }
          ]
        },
        options: {
          maintainAspectRatio: true,
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false,
         
          },
          hover: {
            mode: 'neaest',
            intersect: true,
            animationDuration: 0  
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Year'
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Risk Rating'
                }
              }
            ]
          }
        }
      });
      setChartInstance(newChartInstance);
    } else {
      chartInstance.data.labels = data.map((point) => point.year);
      chartInstance.data.datasets[0].data = data.map((point) => point.riskRating);
      chartInstance.update();
    }
  }, [chartInstance, data]);

  return (
    <div style={{ padding: 20 , maxWidth : "400px" }}>
      <h1>Line Graph</h1>
      <canvas id="myChart" width="400"  height="400"></canvas>
    </div>
  );
};

export default LineGraph;
