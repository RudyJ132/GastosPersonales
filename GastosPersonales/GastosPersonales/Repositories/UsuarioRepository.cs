using GastosPersonales.Entities;
using GastosPersonales.Interfaces;

namespace GastosPersonales.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public Task<bool> EmailExistsAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<Usuario> GetByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<Usuario> GetByIdWithRelationsAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
