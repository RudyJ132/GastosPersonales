using GastosPersonales.Entities;

namespace GastosPersonales.Entities
{
    public class Presupuesto
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int CategoriaId { get; set; }
        public int Mes { get; set; }
        public int Anio { get; set; }
        public decimal MontoLimite { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? UltimaActualizacion { get; set; }
        public Usuario Usuario { get; set; }
        public Categoria Categoria { get; set; }
        public decimal ObtenerGastoActual()
        {
           
            return 0m;
        }
        public decimal ObtenerPorcentajeConsumido()
        {
            
            return 0m;
        }
        public string ObtenerNivelAlerta()
        {
        
            return "Normal";
        }
    }
}