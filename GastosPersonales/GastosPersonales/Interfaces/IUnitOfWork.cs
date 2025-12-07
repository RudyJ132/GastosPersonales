using GastosPersonales.Interfaces;
using System;
using System.Threading.Tasks;

namespace GastosPersonales.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        public IUsuarioRepository Usuarios { get; }
        public ICategoriaRepository Categorias { get; }
        public IMetodoPagoRepository MetodosPago { get; }
        public IGastoRepository Gastos { get; }
        public IPresupuestoRepository Presupuestos { get; }

        public Task<int> SaveChangesAsync();
        public Task BeginTransactionAsync();
        public Task CommitAsync();
        public Task RollbackAsync();
    }
}
