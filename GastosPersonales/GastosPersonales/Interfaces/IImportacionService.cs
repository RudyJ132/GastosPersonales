using GastosPersonales.DTOs.Importacion;
using GastosPersonales.Entities;

namespace GastosPersonales.Interfaces
{
    public interface IImportacionService
    {
        public Task<ImportacionResultadoDto> ImportarCsvAsync(Stream archivo, int usuarioId);
        public Task<ImportacionResultadoDto> ImportarExcelAsync(Stream archivo, int usuarioId);
        public Task<ImportacionResultadoDto> ImportarJsonAsync(Stream archivo, int usuarioId);
        public Task<bool> ValidarFormatoAsync(Stream archivo, string extension);
    }
}
