import React, { useState, useEffect } from 'react';
import { generateMonthlyReport, getExpensesByCategory, compareMonthlyExpenses } from '../services/reportService';
import type { ReporteMensualDto, GastoPorCategoriaDto, ComparacionMensualDto } from '../types/Types';
import { useUIStore } from '../store/uiStore';
import Input from '../components/Input';
import Button from '../components/Button';
import ChartsWrapper from '../components/ChartsWrapper';
import type { ChartData } from 'chart.js';
import { format } from 'date-fns';

const ReportsPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [monthlyReport, setMonthlyReport] = useState<ReporteMensualDto | null>(null);
  const [expensesBreakdown, setExpensesBreakdown] = useState<GastoPorCategoriaDto[]>([]);
  const [monthlyComparison, setMonthlyComparison] = useState<ComparacionMensualDto | null>(null);
  const { showMessage, setLoading, isLoading } = useUIStore();

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      const [year, month] = selectedMonth.split('-').map(Number);

      const report = await generateMonthlyReport(year, month);
      const breakdown = await getExpensesByCategory(year, month);
      const comparison = await compareMonthlyExpenses(year, month);

      setMonthlyReport(report);
      setExpensesBreakdown(breakdown);
      setMonthlyComparison(comparison);
      showMessage('success', '¡Reporte generado exitosamente!');
    } catch (error: any) {
      showMessage('error', error.message || 'Error al generar el reporte.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateReport();
  }, [selectedMonth]); // eslint-disable-line react-hooks/exhaustive-deps

  const chartData: ChartData<'doughnut'> = {
    labels: expensesBreakdown.map(item => item.categoria) || [],
    datasets: [
      {
        data: expensesBreakdown.map(item => item.total) || [],
        backgroundColor: ['#4F46E5', '#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#0EA5E9'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Reportes</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-grow w-full md:w-auto">
          <Input
            label="Seleccionar Mes"
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleGenerateReport} variant="primary" loading={isLoading}>
            Generar Reporte
          </Button>
        </div>
      </div>

      {monthlyReport && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Report Summary Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Resumen Mensual de {selectedMonth}</h2>
            <p className="text-2xl font-bold text-indigo-600">
              Gastos Totales: ${monthlyReport.totalGastos.toFixed(2)}
            </p>
            <p className="text-xl font-bold text-green-600">
              Ingresos Totales: ${monthlyReport.totalIngresos.toFixed(2)}
            </p>
            <p className={`text-3xl font-bold ${monthlyReport.balance >= 0 ? 'text-green-700' : 'text-red-700'} mt-2`}>
              Balance: ${monthlyReport.balance.toFixed(2)}
            </p>
          </div>

          {/* Monthly Comparison Card */}
          {monthlyComparison && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Comparativa Mensual</h2>
              <p className="text-gray-900">Mes Actual ({monthlyComparison.mesActual}/{monthlyComparison.anioActual}): ${monthlyComparison.totalMesActual.toFixed(2)}</p>
              <p className="text-gray-900">Mes Anterior ({monthlyComparison.mesAnterior}/{monthlyComparison.anioAnterior}): ${monthlyComparison.totalMesAnterior.toFixed(2)}</p>

              {/* Calculate difference and percentage for display if needed */}
              {(() => {
                const difference = monthlyComparison.totalMesActual - monthlyComparison.totalMesAnterior;
                const percentageChange = monthlyComparison.totalMesAnterior === 0
                  ? (difference === 0 ? 0 : 100)
                  : (difference / monthlyComparison.totalMesAnterior) * 100;
                const colorClass = difference > 0 ? 'text-red-500' : (difference < 0 ? 'text-green-500' : 'text-gray-500');

                return (
                  <p className={`${colorClass} font-semibold`}>
                    Diferencia: {difference > 0 ? '+' : ''}{difference.toFixed(2)} ({percentageChange.toFixed(2)}%)
                  </p>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {expensesBreakdown.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <ChartsWrapper type="doughnut" data={chartData} title="Distribución de Gastos por Categoría" />
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
