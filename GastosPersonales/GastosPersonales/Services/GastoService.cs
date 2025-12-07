using AutoMapper;
using GastosPersonales.DTOs.Gasto;
using GastosPersonales.Entities;
using GastosPersonales.Exceptions;
using GastosPersonales.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosPersonales.Services
{
    public class GastoService : IGastoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GastoService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<GastoDto> ActualizarAsync(int id, ActualizarGastoDto dto, int usuarioId)
        {
            var gasto = await _unitOfWork.Gastos.GetByIdAsync(id);
            if (gasto == null || gasto.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Gasto no encontrado.");
            }

            _mapper.Map(dto, gasto);
            await _unitOfWork.Gastos.UpdateAsync(gasto);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<GastoDto>(gasto);
        }

        public async Task<GastoDto> CrearAsync(CrearGastoDto dto, int usuarioId)
        {
            var gasto = _mapper.Map<Gasto>(dto);
            gasto.UsuarioId = usuarioId;
            gasto.FechaRegistro = System.DateTime.UtcNow;

            await _unitOfWork.Gastos.AddAsync(gasto);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<GastoDto>(gasto);
        }

        public async Task EliminarAsync(int id, int usuarioId)
        {
            var gasto = await _unitOfWork.Gastos.GetByIdAsync(id);
            if (gasto == null || gasto.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Gasto no encontrado.");
            }

            await _unitOfWork.Gastos.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<GastoDto>> FiltrarAsync(FiltrosGastoDto filtros, int usuarioId)
        {
            var gastos = await _unitOfWork.Gastos.FiltrarGastosAsync(filtros);
            return _mapper.Map<IEnumerable<GastoDto>>(gastos);
        }

        public async Task<IEnumerable<GastoDto>> GetAllByUsuarioAsync(int usuarioId)
        {
            var gastos = await _unitOfWork.Gastos.GetByUsuarioIdAsync(usuarioId);
            return _mapper.Map<IEnumerable<GastoDto>>(gastos);
        }

        public async Task<GastoDto> GetByIdAsync(int id, int usuarioId)
        {
            var gasto = await _unitOfWork.Gastos.GetByIdAsync(id);
            if (gasto == null || gasto.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Gasto no encontrado.");
            }
            return _mapper.Map<GastoDto>(gasto);
        }
    }
}
