using GastosPersonales.DTOs.Gasto;
using GastosPersonales.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosPersonales.Interfaces
{
    public interface IGastoRepository : IRepository<Gasto>
    {
        public Task<IEnumerable<Gasto>> GetByUsuarioIdAsync(int usuarioId);
        public Task<IEnumerable<Gasto>> GetByFechaRangoAsync(int usuarioId, DateTime inicio, DateTime fin);
        public Task<IEnumerable<Gasto>> GetByCategoriaIdAsync(int usuarioId, int categoriaId);
        public Task<IEnumerable<Gasto>> GetByMetodoPagoIdAsync(int usuarioId, int metodoPagoId);
        public Task<IEnumerable<Gasto>> FiltrarGastosAsync(FiltrosGastoDto filtros);
        public Task<decimal> GetTotalByPeriodoAsync(int usuarioId, int mes, int anio);
        public Task<Dictionary<int, decimal>> GetTotalPorCategoriaAsync(int usuarioId, int mes, int anio);
        public Task<IEnumerable<Gasto>> ImportarGastosAsync(List<Gasto> gastos);
    }
}
