using Microsoft.EntityFrameworkCore;
using WebAPI.Entity;

namespace WebAPI.DataAccess;

public class DataContext(DbContextOptions options) : DbContext(options) //class seviyesinde constructor.
{
    public DbSet<Product> Products => Set<Product>(); //Null promise.

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>{
                new Product { Id=1, Name="IPhone 16", Description="Telefon açıklaması", ImageUrl="1.jpg",
                Price=70000, IsActive=true, Stock=100},
                new Product { Id=2, Name="IPhone 16 Pro", Description="Telefon açıklaması", ImageUrl="2.jpg",
                Price=80000, IsActive=true, Stock=200},
                new Product { Id=3, Name="IPhone 16 Pro Max", Description="Telefon açıklaması", ImageUrl="3.jpg",
                Price=90000, IsActive=true, Stock=300},
                new Product { Id=4, Name="IPhone 16 Pro Max Oxi", Description="Telefon açıklaması", ImageUrl="4.jpg",
                Price=100000, IsActive=true, Stock=400},
                new Product { Id=5, Name="IPhone 16 Pro Max Oxi Action", Description="Telefon açıklaması", ImageUrl="5.jpg",
                Price=110000, IsActive=true, Stock=500}
            }
        );
    }
}