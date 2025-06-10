using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Entity;
using WebAPI.Services;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("Login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto model)
    {
        var user = await _userManager.FindByNameAsync(model.UserName);

        if (user == null)
        {
            return BadRequest(new ProblemDetails { Title = "Kullanıcı adı hatalı."}); //Aşağıdaki Unauthorized mesajını requests frontend tarafında hallettik.
        }

        var result = await _userManager.CheckPasswordAsync(user, model.Password);

        if (!result)
        {
            return Unauthorized(new { message = "Eksik veya yanlış şifre girdiniz." });
        }
        return Ok(new UserDto
        {
            Name = user.Name!,
            Token = await _tokenService.GenerateToken(user)
        });
    }

    [HttpPost("Register")]
    public async Task<IActionResult> CreateUser(RegisterDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new AppUser
        {
            Name = model.Name,
            UserName = model.UserName,
            Email = model.Email
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "Customer");
            return StatusCode(201);
        }

        return BadRequest(result.Errors);
    }
}