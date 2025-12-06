using GastosPersonales.Interfaces;

namespace GastosPersonales.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public IUsuarioRepository Usuarios => throw new NotImplementedException();

        public ICategoriaRepository Categorias => throw new NotImplementedException();

        public IMetodoPagoRepository MetodosPago => throw new NotImplementedException();

        public IGastoRepository Gastos => throw new NotImplementedException();

        public IPresupuestoRepository Presupuestos => throw new NotImplementedException();

        public Task BeginTransactionAsync()
        {
            throw new NotImplementedException();
        }

        public Task CommitAsync()
        {
            throw new NotImplementedException();
        }

        public Task RollbackAsync()
        {
            throw new NotImplementedException();
        }

        public Task<int> SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}
