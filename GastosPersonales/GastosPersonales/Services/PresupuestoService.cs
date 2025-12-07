using AutoMapper;
using GastosPersonales.DTOs.Presupuesto;
using GastosPersonales.Entities;
using GastosPersonales.Exceptions;
using GastosPersonales.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosPersonales.Services
{
    public class PresupuestoService : IPresupuestoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PresupuestoService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PresupuestoDto> ActualizarAsync(int id, ActualizarPresupuestoDto dto, int usuarioId)
        {
            var presupuesto = await _unitOfWork.Presupuestos.GetByIdAsync(id);
            if (presupuesto == null || presupuesto.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Presupuesto no encontrado.");
            }

            _mapper.Map(dto, presupuesto);
            presupuesto.UltimaActualizacion = System.DateTime.UtcNow;
            await _unitOfWork.Presupuestos.UpdateAsync(presupuesto);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<PresupuestoDto>(presupuesto);
        }

        public async Task<PresupuestoDto> CrearAsync(CrearPresupuestoDto dto, int usuarioId)
        {
            if (await _unitOfWork.Presupuestos.ExistePresupuestoAsync(usuarioId, dto.CategoriaId, dto.Mes, dto.Anio))
            {
                throw new BusinessException("Ya existe un presupuesto para esa categoría en el mismo mes y año.");
            }

            var presupuesto = _mapper.Map<Presupuesto>(dto);
            presupuesto.UsuarioId = usuarioId;
            presupuesto.FechaCreacion = System.DateTime.UtcNow;

            await _unitOfWork.Presupuestos.AddAsync(presupuesto);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<PresupuestoDto>(presupuesto);
        }

        public async Task EliminarAsync(int id, int usuarioId)
        {
            var presupuesto = await _unitOfWork.Presupuestos.GetByIdAsync(id);
            if (presupuesto == null || presupuesto.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Presupuesto no encontrado.");
            }

            await _unitOfWork.Presupuestos.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<AlertaPresupuestoDto>> GetAlertasAsync(int usuarioId, int mes, int anio)
        {
            var presupuestos = await _unitOfWork.Presupuestos.GetByMesAnioAsync(usuarioId, mes, anio);
            var alertas = new List<AlertaPresupuestoDto>();

            foreach (var presupuesto in presupuestos)
            {
                var gastoActual = await _unitOfWork.Presupuestos.GetGastoAcumuladoAsync(usuarioId, presupuesto.CategoriaId, mes, anio);
                var porcentaje = (gastoActual / presupuesto.MontoLimite) * 100;

                if (porcentaje >= 80)
                {
                    alertas.Add(new AlertaPresupuestoDto
                    {
                        PresupuestoId = presupuesto.Id,
                        CategoriaNombre = presupuesto.Categoria.Nombre,
                        MontoLimite = presupuesto.MontoLimite,
                        MontoActual = gastoActual,
                        PorcentajeConsumido = porcentaje,
                        NivelAlerta = porcentaje >= 100 ? "Crítico" : "Alerta"
                    });
                }
            }

            return alertas;
        }

        public async Task<IEnumerable<PresupuestoDto>> GetAllByUsuarioAsync(int usuarioId)
        {
            var presupuestos = await _unitOfWork.Presupuestos.GetByUsuarioIdAsync(usuarioId);
            return _mapper.Map<IEnumerable<PresupuestoDto>>(presupuestos);
        }

        public async Task<PresupuestoDto> GetByIdAsync(int id, int usuarioId)
        {
            var presupuesto = await _unitOfWork.Presupuestos.GetByIdAsync(id);
            if (presupuesto == null || presupuesto.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Presupuesto no encontrado.");
            }

            var gastoActual = await _unitOfWork.Presupuestos.GetGastoAcumuladoAsync(usuarioId, presupuesto.CategoriaId, presupuesto.Mes, presupuesto.Anio);
            var dto = _mapper.Map<PresupuestoDto>(presupuesto);
            dto.MontoActual = gastoActual;
            dto.PorcentajeConsumido = (gastoActual / presupuesto.MontoLimite) * 100;

            return dto;
        }

        public async Task<decimal> GetPorcentajeConsumidoAsync(int id, int usuarioId)
        {
            var presupuesto = await _unitOfWork.Presupuestos.GetByIdAsync(id);
            if (presupuesto == null || presupuesto.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Presupuesto no encontrado.");
            }

            var gastoActual = await _unitOfWork.Presupuestos.GetGastoAcumuladoAsync(usuarioId, presupuesto.CategoriaId, presupuesto.Mes, presupuesto.Anio);
            return (gastoActual / presupuesto.MontoLimite) * 100;
        }
    }
}
