using GastosPersonales.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosPersonales.Interfaces
{
    public interface ICategoriaRepository : IRepository<Categoria>
    {
        public Task<IEnumerable<Categoria>> GetByUsuarioIdAsync(int usuarioId);
        public Task<Categoria> GetByNombreAsync(int usuarioId, string nombre);
        public Task<bool> TieneGastosAsociadosAsync(int categoriaId);
        public Task<IEnumerable<Categoria>> GetCategoriasActivasAsync(int usuarioId);
    }
}
