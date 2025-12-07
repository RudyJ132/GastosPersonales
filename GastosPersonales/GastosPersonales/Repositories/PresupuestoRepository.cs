using GastosPersonales.Data;
using GastosPersonales.Entities;
using GastosPersonales.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GastosPersonales.Repositories
{
    public class PresupuestoRepository : Repository<Presupuesto>, IPresupuestoRepository
    {
        public PresupuestoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<bool> ExistePresupuestoAsync(int usuarioId, int categoriaId, int mes, int anio)
        {
            return await _dbSet.AnyAsync(p => p.UsuarioId == usuarioId && p.CategoriaId == categoriaId && p.Mes == mes && p.Anio == anio);
        }

        public async Task<IEnumerable<Presupuesto>> GetByMesAnioAsync(int usuarioId, int mes, int anio)
        {
            return await _dbSet.Where(p => p.UsuarioId == usuarioId && p.Mes == mes && p.Anio == anio).ToListAsync();
        }

        public async Task<Presupuesto> GetByUsuarioCategoriaMesAsync(int usuarioId, int categoriaId, int mes, int anio)
        {
            return await _dbSet.FirstOrDefaultAsync(p => p.UsuarioId == usuarioId && p.CategoriaId == categoriaId && p.Mes == mes && p.Anio == anio);
        }

        public async Task<IEnumerable<Presupuesto>> GetByUsuarioIdAsync(int usuarioId)
        {
            return await _dbSet.Where(p => p.UsuarioId == usuarioId).ToListAsync();
        }

        public async Task<decimal> GetGastoAcumuladoAsync(int usuarioId, int categoriaId, int mes, int anio)
        {
            return await _context.Gastos
                .Where(g => g.UsuarioId == usuarioId && g.CategoriaId == categoriaId && g.Fecha.Year == anio && g.Fecha.Month == mes)
                .SumAsync(g => g.Monto);
        }
    }
}
