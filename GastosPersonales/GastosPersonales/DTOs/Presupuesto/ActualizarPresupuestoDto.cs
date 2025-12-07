using System.ComponentModel.DataAnnotations;

namespace GastosPersonales.DTOs.Presupuesto
{
    public class ActualizarPresupuestoDto
    {
        [Required]
        public decimal MontoLimite { get; set; }
    }
}
