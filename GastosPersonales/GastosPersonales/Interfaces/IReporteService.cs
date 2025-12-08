using GastosPersonales.DTOs.Categoria;
using GastosPersonales.DTOs.Reporte;
using GastosPersonales.Entities;

namespace GastosPersonales.Interfaces
{
    public interface IReporteService
    {
        public Task<ReporteMensualDto> GenerarReporteMensualAsync(int usuarioId, int mes, int anio);
        public Task<IEnumerable<GastoPorCategoriaDto>> GetGastosPorCategoriaAsync(int usuarioId, int mes, int anio);
        public Task<ComparacionMensualDto> CompararMesesAsync(int usuarioId, int mes, int anio);
        public Task<IEnumerable<CategoriaDto>> GetTopCategoriasAsync(int usuarioId, int mes, int anio, int top);
        public Task<DashboardSummaryDto> GetDashboardSummaryAsync(int usuarioId);
    }
}


