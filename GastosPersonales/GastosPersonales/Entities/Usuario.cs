using GastosPersonales.Entities;

namespace GastosPersonales.Entities
{
    public class Usuario
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string email { get; set; }
        public string passwordHash { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime? UltimaActualizacion { get; set; }
        public ICollection<Categoria> Categorias { get; set; }
        public ICollection<MetodoPago> MetodosPago { get; set; }
          
    }
}


//DateTime FechaRegistro
//+DateTime ? UltimaActualizacion
//+ ICollection~Categoria~Categorias
//+ ICollection~MetodoPago~MetodosPago
//+ ICollection~Gasto~Gastos
//+ ICollection~Presupuesto~Presupuestos