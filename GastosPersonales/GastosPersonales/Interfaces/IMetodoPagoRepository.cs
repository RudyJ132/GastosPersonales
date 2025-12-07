using GastosPersonales.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosPersonales.Interfaces
{
    public interface IMetodoPagoRepository : IRepository<MetodoPago>
    {
        public Task<IEnumerable<MetodoPago>> GetByUsuarioIdAsync(int usuarioId);
        public Task<MetodoPago> GetByNombreAsync(int usuarioId, string nombre);
        public Task<bool> TieneGastosAsociadosAsync(int metodoPagoId);
        public Task<IEnumerable<MetodoPago>> GetMetodosActivosAsync(int usuarioId);
    }
}
