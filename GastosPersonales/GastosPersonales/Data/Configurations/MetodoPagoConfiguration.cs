using GastosPersonales.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GastosPersonales.Data.Configurations
{
    public class MetodoPagoConfiguration : IEntityTypeConfiguration<MetodoPago>
    {
        public void Configure(EntityTypeBuilder<MetodoPago> builder)
        {
            builder.ToTable("MetodosPago");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Icono).HasMaxLength(50);

            builder.HasOne(e => e.Usuario)
                .WithMany(u => u.MetodosPago)
                .HasForeignKey(e => e.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
