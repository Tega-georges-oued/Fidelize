import React from 'react';

interface ChartProps {
  type: 'line' | 'bar' | 'doughnut' | 'area';
  data?: any[];
  className?: string;
}

const Chart: React.FC<ChartProps> = ({ type, className = '' }) => {
  // Placeholder chart component - in a real app, you'd use a library like Chart.js or Recharts
  const getChartPlaceholder = () => {
    switch (type) {
      case 'line':
        return (
          <div className="h-64 flex items-end space-x-2 p-4">
            {[40, 65, 45, 80, 60, 75, 90, 55, 70, 85, 95, 100].map((height, index) => (
              <div key={index} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        );
      case 'bar':
        return (
          <div className="h-64 flex items-end space-x-2 p-4">
            {[60, 80, 55, 90, 70, 85, 95].map((height, index) => (
              <div key={index} className="flex-1 bg-green-400 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        );
      case 'doughnut':
        return (
          <div className="h-64 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-[40px] border-blue-300" style={{
              borderColor: '#3b82f6 #10b981 #f59e0b #ef4444',
              transform: 'rotate(-90deg)'
            }}></div>
          </div>
        );
      case 'area':
        return (
          <div className="h-64 flex items-end space-x-1 p-4">
            {[30, 45, 35, 60, 50, 65, 80, 45, 55, 75, 85, 90].map((height, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-purple-400 to-purple-200 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        );
      default:
        return <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">Chart Placeholder</div>;
    }
  };

  return (
    <div className={`bg-white rounded-lg ${className}`}>
      {getChartPlaceholder()}
    </div>
  );
};

export default Chart;