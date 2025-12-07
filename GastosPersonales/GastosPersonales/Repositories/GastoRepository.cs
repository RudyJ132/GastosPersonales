using GastosPersonales.Data;
using GastosPersonales.DTOs.Gasto;
using GastosPersonales.Entities;
using GastosPersonales.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GastosPersonales.Repositories
{
    public class GastoRepository : Repository<Gasto>, IGastoRepository
    {
        public GastoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Gasto>> FiltrarGastosAsync(FiltrosGastoDto filtros)
        {
            var query = _dbSet.AsQueryable();

            if (filtros.FechaInicio.HasValue)
            {
                query = query.Where(g => g.Fecha >= filtros.FechaInicio.Value);
            }

            if (filtros.FechaFin.HasValue)
            {
                query = query.Where(g => g.Fecha <= filtros.FechaFin.Value);
            }

            if (filtros.CategoriaId.HasValue)
            {
                query = query.Where(g => g.CategoriaId == filtros.CategoriaId.Value);
            }

            if (filtros.MetodoPagoId.HasValue)
            {
                query = query.Where(g => g.MetodoPagoId == filtros.MetodoPagoId.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Gasto>> GetByCategoriaIdAsync(int usuarioId, int categoriaId)
        {
            return await _dbSet.Where(g => g.UsuarioId == usuarioId && g.CategoriaId == categoriaId).ToListAsync();
        }

        public async Task<IEnumerable<Gasto>> GetByFechaRangoAsync(int usuarioId, DateTime inicio, DateTime fin)
        {
            return await _dbSet.Where(g => g.UsuarioId == usuarioId && g.Fecha >= inicio && g.Fecha <= fin).ToListAsync();
        }

        public async Task<IEnumerable<Gasto>> GetByMetodoPagoIdAsync(int usuarioId, int metodoPagoId)
        {
            return await _dbSet.Where(g => g.UsuarioId == usuarioId && g.MetodoPagoId == metodoPagoId).ToListAsync();
        }

        public async Task<IEnumerable<Gasto>> GetByUsuarioIdAsync(int usuarioId)
        {
            return await _dbSet.Where(g => g.UsuarioId == usuarioId).ToListAsync();
        }

        public async Task<decimal> GetTotalByPeriodoAsync(int usuarioId, int mes, int anio)
        {
            return await _dbSet.Where(g => g.UsuarioId == usuarioId && g.Fecha.Year == anio && g.Fecha.Month == mes).SumAsync(g => g.Monto);
        }

        public async Task<Dictionary<int, decimal>> GetTotalPorCategoriaAsync(int usuarioId, int mes, int anio)
        {
            return await _dbSet
                .Where(g => g.UsuarioId == usuarioId && g.Fecha.Year == anio && g.Fecha.Month == mes)
                .GroupBy(g => g.CategoriaId)
                .ToDictionaryAsync(g => g.Key, g => g.Sum(x => x.Monto));
        }

        public async Task<IEnumerable<Gasto>> ImportarGastosAsync(List<Gasto> gastos)
        {
            await _dbSet.AddRangeAsync(gastos);
            await _context.SaveChangesAsync();
            return gastos;
        }
    }
}
