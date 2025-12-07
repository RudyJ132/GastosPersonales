using GastosPersonales.DTOs.Presupuesto;
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
    public class PresupuestosController : ControllerBase
    {
        private readonly IPresupuestoService _presupuestoService;

        public PresupuestosController(IPresupuestoService presupuestoService)
        {
            _presupuestoService = presupuestoService;
        }

        private int GetUsuarioId()
        {
            var userId = User.FindFirstValue("Id");
            return int.Parse(userId);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var usuarioId = GetUsuarioId();
            var presupuestos = await _presupuestoService.GetAllByUsuarioAsync(usuarioId);
            return Ok(presupuestos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuarioId = GetUsuarioId();
            var presupuesto = await _presupuestoService.GetByIdAsync(id, usuarioId);
            return Ok(presupuesto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CrearPresupuestoDto dto)
        {
            var usuarioId = GetUsuarioId();
            var presupuesto = await _presupuestoService.CrearAsync(dto, usuarioId);
            return CreatedAtAction(nameof(GetById), new { id = presupuesto.Id }, presupuesto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ActualizarPresupuestoDto dto)
        {
            var usuarioId = GetUsuarioId();
            var presupuesto = await _presupuestoService.ActualizarAsync(id, dto, usuarioId);
            return Ok(presupuesto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuarioId = GetUsuarioId();
            await _presupuestoService.EliminarAsync(id, usuarioId);
            return NoContent();
        }

        [HttpGet("alertas/{anio}/{mes}")]
        public async Task<IActionResult> GetAlertas(int anio, int mes)
        {
            var usuarioId = GetUsuarioId();
            var alertas = await _presupuestoService.GetAlertasAsync(usuarioId, mes, anio);
            return Ok(alertas);
        }
    }
}
