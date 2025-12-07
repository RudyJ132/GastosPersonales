using GastosPersonales.Data;
using GastosPersonales.Interfaces;
using System.Threading.Tasks;

namespace GastosPersonales.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        public IUsuarioRepository Usuarios { get; }
        public ICategoriaRepository Categorias { get; }
        public IMetodoPagoRepository MetodosPago { get; }
        public IGastoRepository Gastos { get; }
        public IPresupuestoRepository Presupuestos { get; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Usuarios = new UsuarioRepository(_context);
            Categorias = new CategoriaRepository(_context);
            MetodosPago = new MetodoPagoRepository(_context);
            Gastos = new GastoRepository(_context);
            Presupuestos = new PresupuestoRepository(_context);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            await _context.Database.CommitTransactionAsync();
        }

        public async Task RollbackAsync()
        {
            await _context.Database.RollbackTransactionAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
