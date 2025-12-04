using GastosPersonales.DTOs.Categoria;
using GastosPersonales.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GastosPersonales.Interfaces
{
    public interface ICategoriaService
    {
        public Task<IEnumerable<CategoriaDto>> GetAllByUsuarioAsync(int usuarioId);
        public Task<CategoriaDto> GetByIdAsync(int id, int usuarioId);
        public Task<CategoriaDto> CrearAsync(CrearCategoriaDto dto, int usuarioId);
        public Task<CategoriaDto> ActualizarAsync(int id, ActualizarCategoriaDto dto, int usuarioId);
        public Task EliminarAsync(int id, int usuarioId);
        public Task<bool> ExisteNombreAsync(string nombre, int usuarioId);
        public Task<IEnumerable<CategoriaDto>> GetCategoriasActivasAsync(int usuarioId);
        public Task<IEnumerable<CategoriaDto>> GetCategoriasInactivasAsync(int usuarioId);
    
    }
}

