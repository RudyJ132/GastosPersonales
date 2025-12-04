using GastosPersonales.Interfaces;

namespace GastosPersonales.Interfaces
{
    public interface IUnitOfWork
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



