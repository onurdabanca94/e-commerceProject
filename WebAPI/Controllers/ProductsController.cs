using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DataAccess;
using WebAPI.Entity;

namespace WebAPI.Controllers;

[ApiController]
[Route("/api/[controller]")] // api/products
public class ProductsController : ControllerBase
{
    private readonly DataContext _context;
    public ProductsController(DataContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    //api/products/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int? id)
    {
        //var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
        if(id == null){
            return NotFound();
        }
        var product = await _context.Products.FindAsync(id);

        if(product == null){
            return NotFound();
        }
        return Ok(product);
    }
}
