using GastosPersonales.Entities;
using GastosPersonales.Interfaces;

namespace GastosPersonales.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        public Task<Categoria> GetByNombreAsync(int usuarioId, string nombre)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Categoria>> GetByUsuarioIdAsync(int usuarioId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Categoria>> GetCategoriasActivasAsync(int usuarioId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> TieneGastosAsociadosAsync(int categoriaId)
        {
            throw new NotImplementedException();
        }
    }
}
