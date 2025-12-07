using GastosPersonales.DTOs.Categoria;
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
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriasController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
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
            var categorias = await _categoriaService.GetAllByUsuarioAsync(usuarioId);
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuarioId = GetUsuarioId();
            var categoria = await _categoriaService.GetByIdAsync(id, usuarioId);
            return Ok(categoria);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CrearCategoriaDto dto)
        {
            var usuarioId = GetUsuarioId();
            var categoria = await _categoriaService.CrearAsync(dto, usuarioId);
            return CreatedAtAction(nameof(GetById), new { id = categoria.Id }, categoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ActualizarCategoriaDto dto)
        {
            var usuarioId = GetUsuarioId();
            var categoria = await _categoriaService.ActualizarAsync(id, dto, usuarioId);
            return Ok(categoria);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuarioId = GetUsuarioId();
            await _categoriaService.EliminarAsync(id, usuarioId);
            return NoContent();
        }
    }
}
