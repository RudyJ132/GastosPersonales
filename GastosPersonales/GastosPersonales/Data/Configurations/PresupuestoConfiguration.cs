using GastosPersonales.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GastosPersonales.Data.Configurations
{
    public class PresupuestoConfiguration : IEntityTypeConfiguration<Presupuesto>
    {
        public void Configure(EntityTypeBuilder<Presupuesto> builder)
        {
            builder.ToTable("Presupuestos");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.MontoLimite).HasColumnType("decimal(18, 2)");

            builder.HasIndex(e => new { e.UsuarioId, e.CategoriaId, e.Anio, e.Mes }).IsUnique();

            builder.HasOne(e => e.Usuario)
                .WithMany(p => p.Presupuestos)
                .HasForeignKey(e => e.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Categoria)
                .WithMany(c => c.Presupuestos)
                .HasForeignKey(e => e.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
