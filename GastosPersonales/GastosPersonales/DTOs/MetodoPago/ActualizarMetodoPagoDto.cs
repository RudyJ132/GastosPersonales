using System.ComponentModel.DataAnnotations;

namespace GastosPersonales.DTOs.MetodoPago
{
    public class ActualizarMetodoPagoDto
    {
        [Required]
        public string Nombre { get; set; }
        public string Icono { get; set; }
    }
}
