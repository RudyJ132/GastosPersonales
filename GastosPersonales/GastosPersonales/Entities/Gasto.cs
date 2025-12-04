using GastosPersonales.Entities;

namespace GastosPersonales.Entities
{
    public class Gasto
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int CategoriaId { get; set; }
        public int MetodoPagoId { get; set; }
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaRegistro { get; set; }
        public Usuario Usuario { get; set; }
        public Categoria Categoria { get; set; }
        public MetodoPago MetodoPago { get; set; }

    }
}
