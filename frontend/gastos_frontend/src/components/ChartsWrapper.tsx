import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart as ReactChart } from 'react-chartjs-2';

ChartJS.register(...registerables);

interface ChartsWrapperProps {
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: any; // Chart.js data object
  options?: any; // Chart.js options object
  title?: string;
  className?: string;
}

const ChartsWrapper: React.FC<ChartsWrapperProps> = ({
  type,
  data,
  options,
  title,
  className = '',
}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          font: {
            size: 13,
            family: 'Inter, sans-serif',
          },
          color: '#374151', // text-gray-700
        },
      },
      title: {
        display: title ? true : false,
        text: title,
        font: {
          size: 16,
          family: 'Inter, sans-serif',
          weight: '600', // semi-bold
        },
        color: '#111827', // text-gray-900
      },
      tooltip: {
        backgroundColor: '#111827', // text-gray-900
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 4,
        padding: 10,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
        x: {
            ticks: {
                color: '#6B7280', // text-gray-600
            },
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                color: '#6B7280', // text-gray-600
            },
            grid: {
                color: '#E5E7EB', // border-gray-300
            },
        }
    }
  };

  const mergedOptions = options ? { ...defaultOptions, ...options } : defaultOptions;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div style={{ height: '300px' }}> {/* Fixed height for responsiveness */}
        <ReactChart type={type} data={data} options={mergedOptions} />
      </div>
    </div>
  );
};

export default ChartsWrapper;
