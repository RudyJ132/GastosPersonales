using GastosPersonales.DTOs.Presupuesto;
using GastosPersonales.Entities;

namespace GastosPersonales.Interfaces
{
    public interface IPresupuestoService
    {
        public Task<IEnumerable<PresupuestoDto>> GetAllByUsuarioAsync(int usuarioId);
        public Task<PresupuestoDto> GetByIdAsync(int id, int usuarioId);
        public Task<PresupuestoDto> CrearAsync(CrearPresupuestoDto dto, int usuarioId);
        public Task<PresupuestoDto> ActualizarAsync(int id, ActualizarPresupuestoDto dto, int usuarioId);
        public Task EliminarAsync(int id, int usuarioId);
        public Task<IEnumerable<AlertaPresupuestoDto>> GetAlertasAsync(int usuarioId, int mes, int anio);
        public Task<decimal> GetPorcentajeConsumidoAsync(int id, int usuarioId);
    }
}

