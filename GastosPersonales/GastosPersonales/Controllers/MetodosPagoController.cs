using GastosPersonales.DTOs.MetodoPago;
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
    public class MetodosPagoController : ControllerBase
    {
        private readonly IMetodoPagoService _metodoPagoService;

        public MetodosPagoController(IMetodoPagoService metodoPagoService)
        {
            _metodoPagoService = metodoPagoService;
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
            var metodosPago = await _metodoPagoService.GetAllByUsuarioAsync(usuarioId);
            return Ok(metodosPago);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuarioId = GetUsuarioId();
            var metodoPago = await _metodoPagoService.GetByIdAsync(id, usuarioId);
            return Ok(metodoPago);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CrearMetodoPagoDto dto)
        {
            var usuarioId = GetUsuarioId();
            var metodoPago = await _metodoPagoService.CrearAsync(dto, usuarioId);
            return CreatedAtAction(nameof(GetById), new { id = metodoPago.Id }, metodoPago);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ActualizarMetodoPagoDto dto)
        {
            var usuarioId = GetUsuarioId();
            var metodoPago = await _metodoPagoService.ActualizarAsync(id, dto, usuarioId);
            return Ok(metodoPago);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuarioId = GetUsuarioId();
            await _metodoPagoService.EliminarAsync(id, usuarioId);
            return NoContent();
        }
    }
}
