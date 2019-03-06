using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.IdentityModel.Tokens;
using WebSiteCore.DAL.Entities;
using WebSiteCore.Helpers;

namespace WebSiteCore.Controllers
{
    public class Credentials
    {
        [Required(ErrorMessage = "Поле є обов'язковим")]
        [EmailAddress(ErrorMessage ="Не валідна пошта")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Поле є обов'язковим")]
        public string Password { get; set; }
    }
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : ControllerBase
    {
        readonly UserManager<DbUser> _userManager;
        readonly SignInManager<DbUser> _signInManager;
        public AccountController(UserManager<DbUser> userManager,
            SignInManager<DbUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]Credentials credentials)
        {
            var user = new DbUser
            {
                UserName = credentials.Email,
                Email = credentials.Email
            };
            var result = await _userManager
                .CreateAsync(user, credentials.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);
            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(CreateToken(user));
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]Credentials credentials)
        {
            if (!ModelState.IsValid)
            {
                var errrors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errrors);
            }
            var result = await _signInManager
                .PasswordSignInAsync(credentials.Email, credentials.Password,
                false, false);
            if (!result.Succeeded)
                return BadRequest(new { invalid = "Не валідні дані!" });
            var user = await _userManager.FindByEmailAsync(credentials.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(CreateToken(user));


        }

        
        string CreateToken(DbUser user)
        {
            var claims = new Claim[]
            {
                //new Claim(JwtRegisteredClaimNames.Sub, user.Id)
                new Claim("id", user.Id),
                new Claim("name", user.UserName)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }

}