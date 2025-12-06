using GastosPersonales.DTOs.Gasto;
using GastosPersonales.Entities;
using GastosPersonales.Interfaces;

namespace GastosPersonales.Repositories
{
    public class GastoRepository : IGastoRepository
    {
        public Task<IEnumerable<Gasto>> FiltrarGastosAsync(FiltrosGastoDto filtros)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Gasto>> GetByCategoriaIdAsync(int usuarioId, int categoriaId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Gasto>> GetByFechaRangoAsync(int usuarioId, DateTime inicio, DateTime fin)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Gasto>> GetByMetodoPagoIdAsync(int usuarioId, int metodoPagoId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Gasto>> GetByUsuarioIdAsync(int usuarioId)
        {
            throw new NotImplementedException();
        }

        public Task<decimal> GetTotalByPeriodoAsync(int usuarioId, int mes, int anio)
        {
            throw new NotImplementedException();
        }

        public Task<Dictionary<int, decimal>> GetTotalPorCategoriaAsync(int usuarioId, int mes, int anio)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Gasto>> ImportarGastosAsync(List<Gasto> gastos)
        {
            throw new NotImplementedException();
        }
    }
}
