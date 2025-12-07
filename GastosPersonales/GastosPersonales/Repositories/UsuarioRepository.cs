using GastosPersonales.Data;
using GastosPersonales.Entities;
using GastosPersonales.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace GastosPersonales.Repositories
{
    public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _dbSet.AnyAsync(u => u.email == email);
        }

        public async Task<Usuario> GetByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.email == email);
        }

        public async Task<Usuario> GetByIdWithRelationsAsync(int id)
        {
            return await _dbSet
                .Include(u => u.Categorias)
                .Include(u => u.MetodosPago)
                .FirstOrDefaultAsync(u => u.id == id);
        }

        public new async Task<Usuario> AddAsync(Usuario entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }
    }
}
