using AutoMapper;
using GastosPersonales.DTOs.Auth;
using GastosPersonales.DTOs.Categoria;
using GastosPersonales.DTOs.Gasto;
using GastosPersonales.DTOs.MetodoPago;
using GastosPersonales.DTOs.Presupuesto;
using GastosPersonales.DTOs.Reporte;
using GastosPersonales.DTOs.Usuario;
using GastosPersonales.Entities;

namespace GastosPersonales.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Usuario, UsuarioDto>();
            CreateMap<RegistroRequestDto, Usuario>();

            CreateMap<Categoria, CategoriaDto>();
            CreateMap<CrearCategoriaDto, Categoria>();
            CreateMap<ActualizarCategoriaDto, Categoria>();

            CreateMap<MetodoPago, MetodoPagoDto>();
            CreateMap<CrearMetodoPagoDto, MetodoPago>();
            CreateMap<ActualizarMetodoPagoDto, MetodoPago>();

            CreateMap<Gasto, GastoDto>();
            CreateMap<CrearGastoDto, Gasto>();
            CreateMap<ActualizarGastoDto, Gasto>();

            CreateMap<Presupuesto, PresupuestoDto>();
            CreateMap<CrearPresupuestoDto, Presupuesto>();
            CreateMap<ActualizarPresupuestoDto, Presupuesto>();

            CreateMap<ReporteMensualDto, ReporteMensualDto>();
            CreateMap<GastoPorCategoriaDto, GastoPorCategoriaDto>();
            CreateMap<ComparacionMensualDto, ComparacionMensualDto>();
        }
    }
}
