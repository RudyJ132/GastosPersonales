using GastosPersonales.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosPersonales.Interfaces
{
    public interface IPresupuestoRepository : IRepository<Presupuesto>
    {
        public Task<IEnumerable<Presupuesto>> GetByUsuarioIdAsync(int usuarioId);
        public Task<Presupuesto> GetByUsuarioCategoriaMesAsync(int usuarioId, int categoriaId, int mes, int anio);
        public Task<IEnumerable<Presupuesto>> GetByMesAnioAsync(int usuarioId, int mes, int anio);
        public Task<bool> ExistePresupuestoAsync(int usuarioId, int categoriaId, int mes, int anio);
        public Task<decimal> GetGastoAcumuladoAsync(int usuarioId, int categoriaId, int mes, int anio);
    }
}
