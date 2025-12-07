namespace GastosPersonales.DTOs.Reporte
{
    public class ReporteMensualDto
    {
        public int Mes { get; set; }
        public int Anio { get; set; }
        public decimal TotalIngresos { get; set; }
        public decimal TotalGastos { get; set; }
        public decimal Balance { get; set; }
    }
}
