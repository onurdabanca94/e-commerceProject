using Microsoft.EntityFrameworkCore;
using WebAPI.Entity;

namespace WebAPI.DataAccess;

public class DataContext(DbContextOptions options) : DbContext(options) //class seviyesinde constructor.
{
    public DbSet<Product> Products => Set<Product>(); //Null promise.
}