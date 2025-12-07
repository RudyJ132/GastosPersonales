using AutoMapper;
using GastosPersonales.DTOs.MetodoPago;
using GastosPersonales.Entities;
using GastosPersonales.Exceptions;
using GastosPersonales.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosPersonales.Services
{
    public class MetodoPagoService : IMetodoPagoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MetodoPagoService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<MetodoPagoDto> ActualizarAsync(int id, ActualizarMetodoPagoDto dto, int usuarioId)
        {
            var metodoPago = await _unitOfWork.MetodosPago.GetByIdAsync(id);
            if (metodoPago == null || metodoPago.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Método de pago no encontrado.");
            }

            if (await ExisteNombreAsync(dto.Nombre, usuarioId) && metodoPago.Nombre != dto.Nombre)
            {
                throw new BusinessException("Ya existe un método de pago con ese nombre.");
            }

            _mapper.Map(dto, metodoPago);
            await _unitOfWork.MetodosPago.UpdateAsync(metodoPago);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<MetodoPagoDto>(metodoPago);
        }

        public async Task<MetodoPagoDto> CrearAsync(CrearMetodoPagoDto dto, int usuarioId)
        {
            if (await ExisteNombreAsync(dto.Nombre, usuarioId))
            {
                throw new BusinessException("Ya existe un método de pago con ese nombre.");
            }

            var metodoPago = _mapper.Map<MetodoPago>(dto);
            metodoPago.UsuarioId = usuarioId;
            metodoPago.Activo = true;
            metodoPago.FechaCreacion = System.DateTime.UtcNow;

            await _unitOfWork.MetodosPago.AddAsync(metodoPago);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<MetodoPagoDto>(metodoPago);
        }

        public async Task EliminarAsync(int id, int usuarioId)
        {
            var metodoPago = await _unitOfWork.MetodosPago.GetByIdAsync(id);
            if (metodoPago == null || metodoPago.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Método de pago no encontrado.");
            }

            if (await _unitOfWork.MetodosPago.TieneGastosAsociadosAsync(id))
            {
                throw new BusinessException("No se puede eliminar el método de pago porque tiene gastos asociados.");
            }

            await _unitOfWork.MetodosPago.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> ExisteNombreAsync(string nombre, int usuarioId)
        {
            var metodoPago = await _unitOfWork.MetodosPago.GetByNombreAsync(usuarioId, nombre);
            return metodoPago != null;
        }

        public async Task<IEnumerable<MetodoPagoDto>> GetAllByUsuarioAsync(int usuarioId)
        {
            var metodosPago = await _unitOfWork.MetodosPago.GetByUsuarioIdAsync(usuarioId);
            return _mapper.Map<IEnumerable<MetodoPagoDto>>(metodosPago);
        }

        public async Task<MetodoPagoDto> GetByIdAsync(int id, int usuarioId)
        {
            var metodoPago = await _unitOfWork.MetodosPago.GetByIdAsync(id);
            if (metodoPago == null || metodoPago.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Método de pago no encontrado.");
            }
            return _mapper.Map<MetodoPagoDto>(metodoPago);
        }
    }
}
