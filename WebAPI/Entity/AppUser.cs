using Microsoft.AspNetCore.Identity;

namespace WebAPI.Entity;

public class AppUser : IdentityUser
{
    public string? Name { get; set; }
}