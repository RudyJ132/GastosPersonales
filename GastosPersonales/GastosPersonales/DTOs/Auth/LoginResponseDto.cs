using GastosPersonales.DTOs.Usuario;

namespace GastosPersonales.DTOs.Auth
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public UsuarioDto Usuario { get; set; }
    }
}
