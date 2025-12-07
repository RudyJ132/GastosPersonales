using System.ComponentModel.DataAnnotations;

namespace GastosPersonales.DTOs.Presupuesto
{
    public class CrearPresupuestoDto
    {
        [Required]
        public int CategoriaId { get; set; }
        [Required]
        public int Mes { get; set; }
        [Required]
        public int Anio { get; set; }
        [Required]
        public decimal MontoLimite { get; set; }
    }
}
