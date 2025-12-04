using GastosPersonales.DTOs.MetodoPago;
using GastosPersonales.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GastosPersonales.Interfaces
{
    public interface IMetodoPagoService
    {
        public Task<IEnumerable<MetodoPagoDto>> GetAllByUsuarioAsync(int usuarioId);
        public Task<MetodoPagoDto> GetByIdAsync(int id, int usuarioId);
        public Task<MetodoPagoDto> CrearAsync(CrearMetodoPagoDto dto, int usuarioId);
        public Task<MetodoPagoDto> ActualizarAsync(int id, ActualizarMetodoPagoDto dto, int usuarioId);
        public Task EliminarAsync(int id, int usuarioId);
        public Task<bool> ExisteNombreAsync(string nombre, int usuarioId);
    }
}


