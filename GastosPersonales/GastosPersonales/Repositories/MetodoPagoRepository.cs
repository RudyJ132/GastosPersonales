using GastosPersonales.Entities;
using GastosPersonales.Interfaces;

namespace GastosPersonales.Repositories
{
    public class MetodoPagoRepository : IMetodoPagoRepository
    {
        public Task<MetodoPago> GetByNombreAsync(int usuarioId, string nombre)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MetodoPago>> GetByUsuarioIdAsync(int usuarioId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MetodoPago>> GetMetodosActivosAsync(int usuarioId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> TieneGastosAsociadosAsync(int metodoPagoId)
        {
            throw new NotImplementedException();
        }
    }
}
