using System;

namespace GastosPersonales.DTOs.Gasto
{
    public class GastoDto
    {
        public int Id { get; set; }
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public int CategoriaId { get; set; }
        public int MetodoPagoId { get; set; }
    }
}
