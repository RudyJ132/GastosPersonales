using GastosPersonales.Data;
using GastosPersonales.Interfaces;

namespace GastosPersonales.Repositories
{
    public class Repository<T>(ApplicationDbContext applicationDbContext) : IRepository<T> where T : class
    {
        ApplicationDbContext _applicationDbContext = applicationDbContext;

       
        public  async Task<T> AddAsync(T entity)
        {
          // await _applicationDbContext.Add(entity);
           


        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<T> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
