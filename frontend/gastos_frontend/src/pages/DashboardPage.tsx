import React, { useEffect, useState } from 'react';
import ChartsWrapper from '../components/ChartsWrapper';
import type { ChartData } from 'chart.js'; // Import ChartData type
import apiClient from '../services/apiClient';
import { useUIStore } from '../store/uiStore';

// Mock data for demonstration purposes
const mockDashboardData = {
  totalSpentThisMonth: 1250.75,
  summaryChartData: {
    labels: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Rent'],
    datasets: [
      {
        label: 'Spent',
        data: [400, 200, 300, 150, 200],
        backgroundColor: ['#4F46E5', '#6366F1', '#22C55E', '#F59E0B', '#EF4444'],
        hoverOffset: 4,
      },
    ],
  },
  topCategories: [
    { name: 'Food', amount: 400 },
    { name: 'Utilities', amount: 300 },
    { name: 'Rent', amount: 200 },
  ],
  monthOverMonthComparison: {
    thisMonth: 1250.75,
    lastMonth: 1100.50,
  },
  budgetAlerts: [
    { category: 'Food', percentage: 80, limit: 500, spent: 400 },
    { category: 'Utilities', percentage: 60, limit: 500, spent: 300 },
  ],
};

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<typeof mockDashboardData | null>(null);
  const { showMessage, setLoading } = useUIStore();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In a real application, you would fetch data from your API
        // const data = await apiClient('/dashboard-summary', { isProtected: true });
        // setDashboardData(data);
        setDashboardData(mockDashboardData);
        showMessage('success', 'Dashboard data loaded!');
      } catch (error: any) {
        showMessage('error', error.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [showMessage, setLoading]);

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Loading dashboard data...
      </div>
    );
  }

  const { totalSpentThisMonth, summaryChartData, topCategories, monthOverMonthComparison, budgetAlerts } = dashboardData;

  const getComparisonColor = (current: number, previous: number) => {
    if (current > previous) return 'text-red-500';
    if (current < previous) return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Spent Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Total Spent This Month</h2>
          <p className="text-4xl font-bold text-indigo-600">
            ${totalSpentThisMonth.toFixed(2)}
          </p>
        </div>

        {/* Month over Month Comparison */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Month vs. Last Month</h2>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            This Month: ${monthOverMonthComparison.thisMonth.toFixed(2)}
          </p>
          <p className="text-xl font-medium mb-2">
            Last Month: ${monthOverMonthComparison.lastMonth.toFixed(2)}
          </p>
          <p className={`text-lg font-semibold ${getComparisonColor(monthOverMonthComparison.thisMonth, monthOverMonthComparison.lastMonth)}`}>
            {monthOverMonthComparison.thisMonth > monthOverMonthComparison.lastMonth ? '↑' : '↓'}{' '}
            {(
              ((monthOverMonthComparison.thisMonth - monthOverMonthComparison.lastMonth) /
                monthOverMonthComparison.lastMonth) *
              100
            ).toFixed(2)}%
          </p>
        </div>

        {/* Top Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Top Categories</h2>
          <ul>
            {topCategories.map((cat, index) => (
              <li key={index} className="flex justify-between items-center py-1 border-b last:border-b-0 border-gray-100">
                <span className="text-gray-900">{cat.name}</span>
                <span className="font-semibold text-gray-800">${cat.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Summary Chart */}
        <ChartsWrapper
          type="doughnut"
          data={summaryChartData as ChartData<'doughnut'>}
          title="Spending by Category"
        />

        {/* Budget Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Budget Alerts</h2>
          <div className="space-y-4">
            {budgetAlerts.length === 0 ? (
              <p className="text-gray-500">No budget alerts at the moment.</p>
            ) : (
              budgetAlerts.map((alert, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-800">{alert.category}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          alert.percentage >= 100 ? 'bg-red-500' : alert.percentage >= 80 ? 'bg-orange-500' : 'bg-yellow-400'
                        }`}
                        style={{ width: `${alert.percentage > 100 ? 100 : alert.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ${alert.spent.toFixed(2)} of ${alert.limit.toFixed(2)} spent ({alert.percentage}%)
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">{alert.percentage}%</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
