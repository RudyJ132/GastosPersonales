namespace GastosPersonales.Exceptions
{
    public class UnauthorizedException : Exception
    {
        public UnauthorizedException()
           : base("No tienes autorización para realizar esta acción.") { }

        public UnauthorizedException(string message) : base(message) { }

        public UnauthorizedException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
