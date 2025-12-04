namespace GastosPersonales.Interfaces
{
    public interface IRepository
    {
        public Task<T> GetByIdAsync<T>(int id) where T : class;
        public Task<IEnumerable<T>> GetAllAsync<T>() where T : class;
        public Task<T> AddAsync<T>(T entity) where T : class;
        public Task UpdateAsync<T>(T entity) where T : class;
        public Task DeleteAsync<T>(int id) where T : class;
        public Task<bool> ExistsAsync<T>(int id) where T : class;
        

    }
}