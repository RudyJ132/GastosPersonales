using AutoMapper;
using GastosPersonales.DTOs.Categoria;
using GastosPersonales.Entities;
using GastosPersonales.Exceptions;
using GastosPersonales.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosPersonales.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoriaService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CategoriaDto> ActualizarAsync(int id, ActualizarCategoriaDto dto, int usuarioId)
        {
            var categoria = await _unitOfWork.Categorias.GetByIdAsync(id);
            if (categoria == null || categoria.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Categoría no encontrada.");
            }

            if (await ExisteNombreAsync(dto.Nombre, usuarioId) && categoria.Nombre != dto.Nombre)
            {
                throw new BusinessException("Ya existe una categoría con ese nombre.");
            }

            _mapper.Map(dto, categoria);
            await _unitOfWork.Categorias.UpdateAsync(categoria);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<CategoriaDto>(categoria);
        }

        public async Task<CategoriaDto> CrearAsync(CrearCategoriaDto dto, int usuarioId)
        {
            if (await ExisteNombreAsync(dto.Nombre, usuarioId))
            {
                throw new BusinessException("Ya existe una categoría con ese nombre.");
            }

            var categoria = _mapper.Map<Categoria>(dto);
            categoria.UsuarioId = usuarioId;
            categoria.Activo = true;
            categoria.FechaCreacion = System.DateTime.UtcNow;

            await _unitOfWork.Categorias.AddAsync(categoria);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<CategoriaDto>(categoria);
        }

        public async Task EliminarAsync(int id, int usuarioId)
        {
            var categoria = await _unitOfWork.Categorias.GetByIdAsync(id);
            if (categoria == null || categoria.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Categoría no encontrada.");
            }

            if (await _unitOfWork.Categorias.TieneGastosAsociadosAsync(id))
            {
                throw new BusinessException("No se puede eliminar la categoría porque tiene gastos asociados.");
            }

            await _unitOfWork.Categorias.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> ExisteNombreAsync(string nombre, int usuarioId)
        {
            var categoria = await _unitOfWork.Categorias.GetByNombreAsync(usuarioId, nombre);
            return categoria != null;
        }

        public async Task<IEnumerable<CategoriaDto>> GetAllByUsuarioAsync(int usuarioId)
        {
            var categorias = await _unitOfWork.Categorias.GetByUsuarioIdAsync(usuarioId);
            return _mapper.Map<IEnumerable<CategoriaDto>>(categorias);
        }

        public async Task<CategoriaDto> GetByIdAsync(int id, int usuarioId)
        {
            var categoria = await _unitOfWork.Categorias.GetByIdAsync(id);
            if (categoria == null || categoria.UsuarioId != usuarioId)
            {
                throw new NotFoundException("Categoría no encontrada.");
            }
            return _mapper.Map<CategoriaDto>(categoria);
        }

        public async Task<IEnumerable<CategoriaDto>> GetCategoriasActivasAsync(int usuarioId)
        {
            var categorias = await _unitOfWork.Categorias.GetCategoriasActivasAsync(usuarioId);
            return _mapper.Map<IEnumerable<CategoriaDto>>(categorias);
        }

        public async Task<IEnumerable<CategoriaDto>> GetCategoriasInactivasAsync(int usuarioId)
        {
            var categorias = await _unitOfWork.Categorias.GetByUsuarioIdAsync(usuarioId);
            return _mapper.Map<IEnumerable<CategoriaDto>>(categorias.Where(c => !c.Activo));
        }
    }
}
