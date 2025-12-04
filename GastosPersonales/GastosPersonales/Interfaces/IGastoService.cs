using GastosPersonales.DTOs.Gasto;
using GastosPersonales.Entities;

namespace GastosPersonales.Interfaces
{
    public interface IGastoService
    {
        public Task<IEnumerable<GastoDto>> GetAllByUsuarioAsync(int usuarioId);
        public Task<GastoDto> GetByIdAsync(int id, int usuarioId);
        public Task<GastoDto> CrearAsync(CrearGastoDto dto, int usuarioId);
        public Task<GastoDto> ActualizarAsync(int id, ActualizarGastoDto dto, int usuarioId);
        public Task EliminarAsync(int id, int usuarioId);
        public Task<IEnumerable<GastoDto>> FiltrarAsync(FiltrosGastoDto filtros, int usuarioId);
    }
}

