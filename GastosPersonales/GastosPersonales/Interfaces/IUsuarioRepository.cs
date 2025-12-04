using GastosPersonales.Entities;

namespace GastosPersonales.Interfaces
{
    public interface IUsuarioRepository
    {
        public Task<Usuario> GetByEmailAsync(string email);
        public Task<bool> EmailExistsAsync(string email);
        public Task<Usuario> GetByIdWithRelationsAsync(int id);
    }
}


