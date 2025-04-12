import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  clicksByDay: { [key: string]: number };
  deviceStats: { [key: string]: number };
  browserStats: { [key: string]: number };
  totalClicks: number;
}

interface UrlAnalyticsProps {
  analytics: AnalyticsData;
}

const UrlAnalytics: React.FC<UrlAnalyticsProps> = ({ analytics }) => {
  const { clicksByDay, deviceStats, browserStats, totalClicks } = analytics;

  // Prepare data for clicks over time chart
  const clicksData = {
    labels: Object.keys(clicksByDay).map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Clicks',
        data: Object.values(clicksByDay),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1
      }
    ]
  };

  // Prepare data for device distribution chart
  const deviceData = {
    labels: Object.keys(deviceStats),
    datasets: [
      {
        data: Object.values(deviceStats),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  // Prepare data for browser usage chart
  const browserData = {
    labels: Object.keys(browserStats),
    datasets: [
      {
        data: Object.values(browserStats),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Clicks Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Total Clicks</h3>
        <p className="text-4xl font-bold text-blue-700">{totalClicks}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Clicks Over Time</h3>
          <div className="h-64">
            <Line 
              data={clicksData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1f2937',
                    bodyColor: '#1f2937',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                      label: (context) => `${context.parsed.y} clicks`
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Distribution</h3>
          <div className="h-64">
            <Doughnut 
              data={deviceData} 
              options={{
                ...doughnutOptions,
                plugins: {
                  ...doughnutOptions.plugins,
                  tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1f2937',
                    bodyColor: '#1f2937',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                      label: (context) => {
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const value = context.parsed;
                        const percentage = Math.round((value / total) * 100);
                        return `${context.label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Browser Usage</h3>
          <div className="h-64">
            <Doughnut 
              data={browserData} 
              options={{
                ...doughnutOptions,
                plugins: {
                  ...doughnutOptions.plugins,
                  tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1f2937',
                    bodyColor: '#1f2937',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                      label: (context) => {
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const value = context.parsed;
                        const percentage = Math.round((value / total) * 100);
                        return `${context.label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlAnalytics; 