using GastosPersonales.Entities;
using System.Threading.Tasks;

namespace GastosPersonales.Interfaces
{
    public interface IUsuarioRepository : IRepository<Usuario>
    {
        public Task<Usuario> GetByEmailAsync(string email);
        public Task<bool> EmailExistsAsync(string email);
        public Task<Usuario> GetByIdWithRelationsAsync(int id);
        public new Task<Usuario> AddAsync(Usuario usuario);
    }
}


