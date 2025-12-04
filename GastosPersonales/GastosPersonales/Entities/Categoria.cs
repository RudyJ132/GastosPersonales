using GastosPersonales.Entities;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GastosPersonales.Entities
{
    public class Categoria
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public DateTime FechaCreacion { get; set; }
        public Usuario Usuario { get; set; }
        public ICollection<Gasto> Gastos { get; set; }
        public ICollection<Presupuesto> Presupuestos { get; set; }
    }
}

