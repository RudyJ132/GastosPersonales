using System;
using System.ComponentModel.DataAnnotations;

namespace GastosPersonales.DTOs.Gasto
{
    public class CrearGastoDto
    {
        [Required]
        public decimal Monto { get; set; }
        [Required]
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        [Required]
        public int CategoriaId { get; set; }
        [Required]
        public int MetodoPagoId { get; set; }
    }
}
