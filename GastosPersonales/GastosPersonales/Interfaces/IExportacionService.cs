using GastosPersonales.Entities;

namespace GastosPersonales.Interfaces
{
    public interface IExportacionService
    {
        public Task<byte[]> ExportarExcelAsync(int usuarioId, int mes, int anio);
        public Task<byte[]> ExportarTxtAsync(int usuarioId, int mes, int anio);
        public Task<string> ExportarJsonAsync(int usuarioId, int mes, int anio);
    }
}
