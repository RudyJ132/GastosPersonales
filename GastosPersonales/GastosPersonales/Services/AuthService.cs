using AutoMapper;
using GastosPersonales.DTOs.Auth;
using GastosPersonales.DTOs.Usuario;
using GastosPersonales.Entities;
using GastosPersonales.Exceptions;
using GastosPersonales.Helpers;
using GastosPersonales.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace GastosPersonales.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly JwtHelper _jwtHelper;

        public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration, IMapper mapper, JwtHelper jwtHelper)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _mapper = mapper;
            _jwtHelper = jwtHelper;
        }

        public async Task<string> GenerarTokenAsync(Usuario usuario)
        {
            return _jwtHelper.GenerateToken(usuario);
        }

        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
        {
            var usuario = await _unitOfWork.Usuarios.GetByEmailAsync(request.Email);
            if (usuario == null || !PasswordHasher.VerifyPassword(request.Password, usuario.passwordHash))
            {
                throw new UnauthorizedException("Credenciales inválidas.");
            }

            var token = await GenerarTokenAsync(usuario);
            var usuarioDto = _mapper.Map<UsuarioDto>(usuario);

            return new LoginResponseDto { Token = token, Usuario = usuarioDto };
        }

        public async Task<UsuarioDto> RegistrarAsync(RegistroRequestDto request)
        {
            if (await _unitOfWork.Usuarios.EmailExistsAsync(request.Email))
            {
                throw new BusinessException("El email ya está registrado.");
            }

            var usuario = _mapper.Map<Usuario>(request);
            usuario.passwordHash = PasswordHasher.HashPassword(request.Password);
            usuario.FechaRegistro = DateTime.UtcNow;

            await _unitOfWork.Usuarios.AddAsync(usuario);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<UsuarioDto>(usuario);
        }

        public async Task<bool> ValidarCredencialesAsync(string email, string password)
        {
            var usuario = await _unitOfWork.Usuarios.GetByEmailAsync(email);
            return usuario != null && PasswordHasher.VerifyPassword(password, usuario.passwordHash);
        }
    }
}
