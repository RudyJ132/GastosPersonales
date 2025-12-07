using GastosPersonales.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GastosPersonales.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReportesController : ControllerBase
    {
        private readonly IReporteService _reporteService;

        public ReportesController(IReporteService reporteService)
        {
            _reporteService = reporteService;
        }

        private int GetUsuarioId()
        {
            var userId = User.FindFirstValue("Id");
            return int.Parse(userId);
        }

        [HttpGet("mensual/{anio}/{mes}")]
        public async Task<IActionResult> GetReporteMensual(int anio, int mes)
        {
            var usuarioId = GetUsuarioId();
            var reporte = await _reporteService.GenerarReporteMensualAsync(usuarioId, mes, anio);
            return Ok(reporte);
        }

        [HttpGet("gastos-por-categoria/{anio}/{mes}")]
        public async Task<IActionResult> GetGastosPorCategoria(int anio, int mes)
        {
            var usuarioId = GetUsuarioId();
            var gastos = await _reporteService.GetGastosPorCategoriaAsync(usuarioId, mes, anio);
            return Ok(gastos);
        }

        [HttpGet("comparacion-mensual/{anio}/{mes}")]
        public async Task<IActionResult> GetComparacionMensual(int anio, int mes)
        {
            var usuarioId = GetUsuarioId();
            var comparacion = await _reporteService.CompararMesesAsync(usuarioId, mes, anio);
            return Ok(comparacion);
        }

        [HttpGet("top-categorias/{anio}/{mes}/{top}")]
        public async Task<IActionResult> GetTopCategorias(int anio, int mes, int top)
        {
            var usuarioId = GetUsuarioId();
            var categorias = await _reporteService.GetTopCategoriasAsync(usuarioId, mes, anio, top);
            return Ok(categorias);
        }
    }
}
