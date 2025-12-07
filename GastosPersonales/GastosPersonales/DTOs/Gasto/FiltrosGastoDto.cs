using System;

namespace GastosPersonales.DTOs.Gasto
{
    public class FiltrosGastoDto
    {
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public int? CategoriaId { get; set; }
        public int? MetodoPagoId { get; set; }
    }
}
