namespace GastosPersonales.DTOs.Presupuesto
{
    public class PresupuestoDto
    {
        public int Id { get; set; }
        public int CategoriaId { get; set; }
        public int Mes { get; set; }
        public int Anio { get; set; }
        public decimal MontoLimite { get; set; }
        public decimal MontoActual { get; set; }
        public decimal PorcentajeConsumido { get; set; }
    }
}
