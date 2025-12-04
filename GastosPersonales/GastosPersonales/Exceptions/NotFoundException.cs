namespace GastosPersonales.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException() : base() { }

        public NotFoundException(string message) : base(message) { }

        public NotFoundException(string message, Exception innerException)
            : base(message, innerException) { }

        public NotFoundException(string entityName, object key)
            : base($"La entidad '{entityName}' con id '{key}' no fue encontrada.") { }
    }
}
