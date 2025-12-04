using GastosPersonales.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GastosPersonales.Interfaces
{
    public interface IMetodoPagoRepository
    {
        public Task<IEnumerable<MetodoPago>> GetByUsuarioIdAsync(int usuarioId);
        public Task<MetodoPago> GetByNombreAsync(int usuarioId, string nombre);
        public Task<bool> TieneGastosAsociadosAsync(int metodoPagoId);
        public Task<IEnumerable<MetodoPago>> GetMetodosActivosAsync(int usuarioId);
  
    }
}

