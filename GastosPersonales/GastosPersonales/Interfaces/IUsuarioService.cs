using GastosPersonales.DTOs.Usuario;

namespace GastosPersonales.Interfaces
{
    public interface IUsuarioService
    {
        public Task<UsuarioDto> GetByIdAsync(int id);
        public Task<UsuarioDto> ActualizarPerfilAsync(int id, ActualizarPerfilDto dto);
        public Task CambiarPasswordAsync(int id, CambiarPasswordDto dto);
        public Task<bool> EmailDisponibleAsync(string email);
    }
}

