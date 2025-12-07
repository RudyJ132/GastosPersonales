using System.ComponentModel.DataAnnotations;

namespace GastosPersonales.DTOs.Categoria
{
    public class ActualizarCategoriaDto
    {
        [Required]
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
    }
}
