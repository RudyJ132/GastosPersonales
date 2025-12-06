using Microsoft.EntityFrameworkCore;
using GastosPersonales.Entities;

namespace GastosPersonales.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; } = null!;
        public DbSet<Categoria> Categorias { get; set; } = null!;
        public DbSet<MetodoPago> MetodosPago { get; set; } = null!;
        public DbSet<Gasto> Gastos { get; set; } = null!;
        public DbSet<Presupuesto> Presupuestos { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Usuario Configuration
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("Usuarios");
                entity.HasKey(e => e.id);
                entity.Property(e => e.nombre).IsRequired().HasMaxLength(100);
                entity.Property(e => e.email).IsRequired().HasMaxLength(255);
                entity.HasIndex(e => e.email).IsUnique();
                entity.Property(e => e.passwordHash).IsRequired();

                entity.HasMany(e => e.Categorias)
                    .WithOne(c => c.Usuario)
                    .HasForeignKey(c => c.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.MetodosPago)
                    .WithOne(m => m.Usuario)
                    .HasForeignKey(m => m.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Categoria Configuration
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.ToTable("Categorias");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Descripcion).HasMaxLength(500);

                entity.HasOne(e => e.Usuario)
                    .WithMany(u => u.Categorias)
                    .HasForeignKey(e => e.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // MetodoPago Configuration
            modelBuilder.Entity<MetodoPago>(entity =>
            {
                entity.ToTable("MetodosPago");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Icono).HasMaxLength(50);


                entity.HasOne(e => e.Usuario)
                    .WithMany(u => u.MetodosPago)
                    .HasForeignKey(e => e.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict);
           });

            // Gasto Configuration
            modelBuilder.Entity<Gasto>(entity =>
            {
                entity.ToTable("Gastos");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Monto).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.Descripcion).HasMaxLength(500);

                entity.HasOne(e => e.Usuario)
                    .WithMany()
                    .HasForeignKey(e => e.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Categoria)
                    .WithMany(c => c.Gastos)
                    .HasForeignKey(e => e.CategoriaId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.MetodoPago)
                    .WithMany(m => m.Gastos)
                    .HasForeignKey(e => e.MetodoPagoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Presupuesto Configuration
            modelBuilder.Entity<Presupuesto>(entity =>
            {
                entity.ToTable("Presupuestos");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.MontoLimite).HasColumnType("decimal(18, 2)");
                
                entity.HasIndex(e => new { e.UsuarioId, e.CategoriaId, e.Anio, e.Mes }).IsUnique();

                entity.HasOne(e => e.Usuario)
                    .WithMany()
                    .HasForeignKey(e => e.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Categoria)
                    .WithMany(c => c.Presupuestos)
                    .HasForeignKey(e => e.CategoriaId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
