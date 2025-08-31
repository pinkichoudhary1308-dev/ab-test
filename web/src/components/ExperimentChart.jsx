import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExperimentChart = ({ experiment }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!experiment) return;

    const fetchData = async () => {
      try {
        // ✅ Fetch variants and exposures (votes)
        const [variantsRes, exposuresRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/variants/experiment/${experiment.id}`),
          axios.get(`http://localhost:8080/api/exposures/experiment/${experiment.id}`)
        ]);

        const variants = variantsRes.data || [];
        const exposures = exposuresRes.data || [];

        const totalVotes = exposures.length;

        const data = {
          labels: variants.map(v => v.name),
          datasets: [
            {
              label: 'Conversion Rate (%)',
              data: variants.map(variant => {
                const votesForVariant = exposures.filter(
                  e => e.variant.id === variant.id
                ).length;
                return totalVotes > 0
                  ? ((votesForVariant / totalVotes) * 100).toFixed(2)
                  : 0;
              }),
              backgroundColor: variants.map((_, i) =>
                i % 2 === 0 ? 'rgba(0, 168, 232, 0.6)' : 'rgba(0, 227, 150, 0.6)'
              ),
              borderColor: variants.map((_, i) =>
                i % 2 === 0 ? '#00a8e8' : '#00e396'
              ),
              borderWidth: 2,
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setChartData({
          labels: ["No Data"],
          datasets: [{ label: "Conversion Rate (%)", data: [0] }]
        });
        setLoading(false);
      }
    };

    fetchData();
    // 🔄 Refresh every 3s so all users see live percentages
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);

  }, [experiment]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#e0e0e0' } },
      title: {
        display: true,
        text: experiment ? `Results for: ${experiment.name}` : "Experiment Results",
        color: '#fff',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#a0a0a0' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      x: {
        ticks: { color: '#a0a0a0' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <div className="chart-container card">
      {loading ? <p>Loading chart data...</p> : <Bar options={options} data={chartData} />}
    </div>
  );
};

export default ExperimentChart;
