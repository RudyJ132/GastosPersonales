using GastosPersonales.Entities;
using GastosPersonales.Interfaces;

namespace GastosPersonales.Repositories
{
    public class PresupuestoRepository : IPresupuestoRepository
    {
        public Task<bool> ExistePresupuestoAsync(int usuarioId, int categoriaId, int mes, int anio)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Presupuesto>> GetByMesAnioAsync(int usuarioId, int mes, int anio)
        {
            throw new NotImplementedException();
        }

        public Task<Presupuesto> GetByUsuarioCategoriaMesAsync(int usuarioId, int categoriaId, int mes, int anio)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Presupuesto>> GetByUsuarioIdAsync(int usuarioId)
        {
            throw new NotImplementedException();
        }

        public Task<decimal> GetGastoAcumuladoAsync(int usuarioId, int categoriaId, int mes, int anio)
        {
            throw new NotImplementedException();
        }
    }
}
