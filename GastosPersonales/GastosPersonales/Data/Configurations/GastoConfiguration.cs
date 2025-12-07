using GastosPersonales.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GastosPersonales.Data.Configurations
{
    public class GastoConfiguration : IEntityTypeConfiguration<Gasto>
    {
        public void Configure(EntityTypeBuilder<Gasto> builder)
        {
            builder.ToTable("Gastos");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Monto).HasColumnType("decimal(18, 2)");
            builder.Property(e => e.Descripcion).HasMaxLength(500);

            builder.HasOne(e => e.Usuario)
                .WithMany(u => u.Gastos)
                .HasForeignKey(e => e.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Categoria)
                .WithMany(c => c.Gastos)
                .HasForeignKey(e => e.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.MetodoPago)
                .WithMany(m => m.Gastos)
                .HasForeignKey(e => e.MetodoPagoId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
