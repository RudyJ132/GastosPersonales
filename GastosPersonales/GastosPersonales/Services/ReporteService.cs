using AutoMapper;
using GastosPersonales.DTOs.Categoria;
using GastosPersonales.DTOs.Reporte;
using GastosPersonales.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GastosPersonales.Services
{
    public class ReporteService : IReporteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReporteService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ComparacionMensualDto> CompararMesesAsync(int usuarioId, int mes, int anio)
        {
            var mesAnterior = mes == 1 ? 12 : mes - 1;
            var anioAnterior = mes == 1 ? anio - 1 : anio;

            var totalMesActual = await _unitOfWork.Gastos.GetTotalByPeriodoAsync(usuarioId, mes, anio);
            var totalMesAnterior = await _unitOfWork.Gastos.GetTotalByPeriodoAsync(usuarioId, mesAnterior, anioAnterior);

            return new ComparacionMensualDto
            {
                MesActual = mes,
                AnioActual = anio,
                TotalMesActual = totalMesActual,
                MesAnterior = mesAnterior,
                AnioAnterior = anioAnterior,
                TotalMesAnterior = totalMesAnterior
            };
        }

        public async Task<ReporteMensualDto> GenerarReporteMensualAsync(int usuarioId, int mes, int anio)
        {
            var totalGastos = await _unitOfWork.Gastos.GetTotalByPeriodoAsync(usuarioId, mes, anio);
            // Assuming ingresos are not implemented yet, so we'll use a placeholder
            var totalIngresos = 0m;

            return new ReporteMensualDto
            {
                Mes = mes,
                Anio = anio,
                TotalGastos = totalGastos,
                TotalIngresos = totalIngresos,
                Balance = totalIngresos - totalGastos
            };
        }

        public async Task<IEnumerable<GastoPorCategoriaDto>> GetGastosPorCategoriaAsync(int usuarioId, int mes, int anio)
        {
            var gastosPorCategoria = await _unitOfWork.Gastos.GetTotalPorCategoriaAsync(usuarioId, mes, anio);
            var totalGastos = gastosPorCategoria.Sum(g => g.Value);
            var categorias = await _unitOfWork.Categorias.GetByUsuarioIdAsync(usuarioId);

            return gastosPorCategoria.Select(g => new GastoPorCategoriaDto
            {
                Categoria = categorias.FirstOrDefault(c => c.Id == g.Key)?.Nombre,
                Total = g.Value,
                Porcentaje = totalGastos > 0 ? (double)(g.Value / totalGastos) * 100 : 0
            });
        }

        public async Task<IEnumerable<CategoriaDto>> GetTopCategoriasAsync(int usuarioId, int mes, int anio, int top)
        {
            var gastosPorCategoria = await _unitOfWork.Gastos.GetTotalPorCategoriaAsync(usuarioId, mes, anio);
            var topCategoriasIds = gastosPorCategoria.OrderByDescending(g => g.Value).Take(top).Select(g => g.Key);
            var categorias = await _unitOfWork.Categorias.GetAllAsync();

            return _mapper.Map<IEnumerable<CategoriaDto>>(categorias.Where(c => topCategoriasIds.Contains(c.Id)));
        }

        public async Task<DashboardSummaryDto> GetDashboardSummaryAsync(int usuarioId)
        {
            var today = DateTime.Today;
            var currentMonth = today.Month;
            var currentYear = today.Year;
            var lastMonth = currentMonth == 1 ? 12 : currentMonth - 1;
            var lastMonthYear = currentMonth == 1 ? currentYear - 1 : currentYear;

            // Total Spent This Month
            var totalSpentThisMonth = await _unitOfWork.Gastos.GetTotalByPeriodoAsync(usuarioId, currentMonth, currentYear);

            // Month Over Month Comparison
            var totalSpentLastMonth = await _unitOfWork.Gastos.GetTotalByPeriodoAsync(usuarioId, lastMonth, lastMonthYear);
            var comparison = new MonthOverMonthComparisonDto
            {
                ThisMonth = totalSpentThisMonth,
                LastMonth = totalSpentLastMonth
            };

            // Top Categories (Top 3)
            var gastosPorCategoria = await _unitOfWork.Gastos.GetTotalPorCategoriaAsync(usuarioId, currentMonth, currentYear);
            var allCategories = await _unitOfWork.Categorias.GetByUsuarioIdAsync(usuarioId);
            
            var topCategories = gastosPorCategoria
                .OrderByDescending(g => g.Value)
                .Take(3)
                .Select(g => new TopCategoryDto
                {
                    Name = allCategories.FirstOrDefault(c => c.Id == g.Key)?.Nombre ?? "Unknown",
                    Amount = g.Value
                })
                .ToList();

            // Summary Chart Data
            var chartLabels = topCategories.Select(c => c.Name).ToList();
            var chartData = topCategories.Select(c => c.Amount).ToList();
            var backgroundColors = new List<string> { "#4F46E5", "#22C55E", "#EF4444", "#F59E0B", "#6366F1" };

            var summaryChartData = new SummaryChartDataDto
            {
                Labels = chartLabels,
                Datasets = new List<ChartDatasetDto>
                {
                    new ChartDatasetDto
                    {
                        Label = "Spent",
                        Data = chartData,
                        BackgroundColor = backgroundColors.Take(chartData.Count).ToList(),
                        HoverOffset = 4
                    }
                }
            };

            // Budget Alerts (Mock logic for now as fetching budgets requires complexities)
            // TODO: Integrate actual budget logic
            var budgetAlerts = new List<BudgetAlertDto>(); 

            return new DashboardSummaryDto
            {
                TotalSpentThisMonth = totalSpentThisMonth,
                MonthOverMonthComparison = comparison,
                TopCategories = topCategories,
                SummaryChartData = summaryChartData,
                BudgetAlerts = budgetAlerts
            };
        }
    }
}
