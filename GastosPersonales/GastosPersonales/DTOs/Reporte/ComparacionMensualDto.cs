namespace GastosPersonales.DTOs.Reporte
{
    public class ComparacionMensualDto
    {
        public int MesActual { get; set; }
        public int AnioActual { get; set; }
        public decimal TotalMesActual { get; set; }
        public int MesAnterior { get; set; }
        public int AnioAnterior { get; set; }
        public decimal TotalMesAnterior { get; set; }
    }
}
