using System.ComponentModel.DataAnnotations;

namespace GastosPersonales.DTOs.Auth
{
    public class RegistroRequestDto
    {
        [Required]
        public string Nombre { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
