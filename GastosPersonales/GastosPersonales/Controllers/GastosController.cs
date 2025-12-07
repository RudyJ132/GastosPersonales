using GastosPersonales.DTOs.Gasto;
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
    public class GastosController : ControllerBase
    {
        private readonly IGastoService _gastoService;

        public GastosController(IGastoService gastoService)
        {
            _gastoService = gastoService;
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
            var gastos = await _gastoService.GetAllByUsuarioAsync(usuarioId);
            return Ok(gastos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuarioId = GetUsuarioId();
            var gasto = await _gastoService.GetByIdAsync(id, usuarioId);
            return Ok(gasto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CrearGastoDto dto)
        {
            var usuarioId = GetUsuarioId();
            var gasto = await _gastoService.CrearAsync(dto, usuarioId);
            return CreatedAtAction(nameof(GetById), new { id = gasto.Id }, gasto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ActualizarGastoDto dto)
        {
            var usuarioId = GetUsuarioId();
            var gasto = await _gastoService.ActualizarAsync(id, dto, usuarioId);
            return Ok(gasto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuarioId = GetUsuarioId();
            await _gastoService.EliminarAsync(id, usuarioId);
            return NoContent();
        }

        [HttpPost("filtrar")]
        public async Task<IActionResult> Filtrar([FromBody] FiltrosGastoDto filtros)
        {
            var usuarioId = GetUsuarioId();
            var gastos = await _gastoService.FiltrarAsync(filtros, usuarioId);
            return Ok(gastos);
        }
    }
}
