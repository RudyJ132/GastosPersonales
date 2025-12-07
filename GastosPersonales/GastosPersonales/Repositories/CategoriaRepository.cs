using GastosPersonales.Data;
using GastosPersonales.Entities;
using GastosPersonales.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GastosPersonales.Repositories
{
    public class CategoriaRepository : Repository<Categoria>, ICategoriaRepository
    {
        public CategoriaRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Categoria> GetByNombreAsync(int usuarioId, string nombre)
        {
            return await _dbSet.FirstOrDefaultAsync(c => c.UsuarioId == usuarioId && c.Nombre == nombre);
        }

        public async Task<IEnumerable<Categoria>> GetByUsuarioIdAsync(int usuarioId)
        {
            return await _dbSet.Where(c => c.UsuarioId == usuarioId).ToListAsync();
        }

        public async Task<IEnumerable<Categoria>> GetCategoriasActivasAsync(int usuarioId)
        {
            return await _dbSet.Where(c => c.UsuarioId == usuarioId && c.Activo).ToListAsync();
        }

        public async Task<bool> TieneGastosAsociadosAsync(int categoriaId)
        {
            return await _context.Gastos.AnyAsync(g => g.CategoriaId == categoriaId);
        }
    }
}
