namespace GastosPersonales.DTOs.Presupuesto
{
    public class AlertaPresupuestoDto
    {
        public int PresupuestoId { get; set; }
        public string CategoriaNombre { get; set; }
        public decimal MontoLimite { get; set; }
        public decimal MontoActual { get; set; }
        public decimal PorcentajeConsumido { get; set; }
        public string NivelAlerta { get; set; }
    }
}
