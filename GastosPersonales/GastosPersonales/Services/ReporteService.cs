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
    }
}
