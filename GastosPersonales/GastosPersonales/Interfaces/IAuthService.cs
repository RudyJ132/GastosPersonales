using GastosPersonales.DTOs.Auth;
using GastosPersonales.DTOs.Usuario;
using GastosPersonales.Entities;

namespace GastosPersonales.Interfaces
{
    public interface IAuthService
    {
        public Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
        public Task<UsuarioDto> RegistrarAsync(RegistroRequestDto request);
        public Task<string> GenerarTokenAsync(Usuario usuario);
        public Task<bool> ValidarCredencialesAsync(string email, string password);
    }
}

