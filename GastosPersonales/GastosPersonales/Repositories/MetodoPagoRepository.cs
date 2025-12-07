using GastosPersonales.Data;
using GastosPersonales.Entities;
using GastosPersonales.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GastosPersonales.Repositories
{
    public class MetodoPagoRepository : Repository<MetodoPago>, IMetodoPagoRepository
    {
        public MetodoPagoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<MetodoPago> GetByNombreAsync(int usuarioId, string nombre)
        {
            return await _dbSet.FirstOrDefaultAsync(m => m.UsuarioId == usuarioId && m.Nombre == nombre);
        }

        public async Task<IEnumerable<MetodoPago>> GetByUsuarioIdAsync(int usuarioId)
        {
            return await _dbSet.Where(m => m.UsuarioId == usuarioId).ToListAsync();
        }

        public async Task<IEnumerable<MetodoPago>> GetMetodosActivosAsync(int usuarioId)
        {
            return await _dbSet.Where(m => m.UsuarioId == usuarioId && m.Activo).ToListAsync();
        }

        public async Task<bool> TieneGastosAsociadosAsync(int metodoPagoId)
        {
            return await _context.Gastos.AnyAsync(g => g.MetodoPagoId == metodoPagoId);
        }
    }
}
