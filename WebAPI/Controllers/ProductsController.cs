using Microsoft.AspNetCore.Mvc;
using WebAPI.Entity;

namespace WebAPI.Controllers;

[ApiController]
[Route("/api/[controller]")] // api/products
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetProducts()
    {
        return Ok(
            new List<Product>()
            {
                new Product
                {
                    Id = 1,
                    Name = "IPhone 16",
                    Description = "Telefon açıklaması",
                    ImageUrl = "1.jpg",
                    Price = 70000,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 2,
                    Name = "IPhone 16 Pro",
                    Description = "Telefon açıklaması",
                    ImageUrl = "2.jpg",
                    Price = 80000,
                    IsActive = true,
                    Stock = 200
                }
            }
        );
    }

    //api/products/1
    [HttpGet("{id}")]
    public IActionResult GetProduct(int id)
    {
        return Ok(
            new Product
            {
                Id = 1,
                Name = "IPhone 16",
                Description = "Telefon açıklaması",
                ImageUrl = "1.jpg",
                Price = 70000,
                IsActive = true,
                Stock = 100
            }
        );
    }
}
