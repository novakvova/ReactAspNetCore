using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebSiteCore.BLL.Models;
using WebSiteCore.DAL.Entities;
using WebSiteCore.Helpers;

namespace WebSiteCore.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize(Roles = "admin")]
    public class CategoryController : ControllerBase
    {
        private readonly EFDbContext _context;
        readonly UserManager<DbUser> _userManager;

        public CategoryController(EFDbContext context, UserManager<DbUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = _context.Categories.Select(x => new CategoryModel { Id = x.Id, Name = x.Name }).ToList();

            return Ok(categories);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CategoryModel model)
        {
            if (!ModelState.IsValid)
            {
                var errrors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errrors);
            }

            if (_context.Categories.Where(x => x.Name == model.Name).Count() != 0)
            {
                return BadRequest(new { name = "Category is alredy created" });

            }
            var category = new Category { Name = model.Name };
            _context.Categories.Add(category);
            _context.SaveChanges();

            return Ok(category);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory([FromRoute] int id, [FromBody] CategoryModel model)
        {
            if (!ModelState.IsValid)
            {
                var errrors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errrors);
            }
            var category = _context.Categories.SingleOrDefault(x => x.Id == id);

            if(category==null)
                return BadRequest(new { invalid = "Category is not found" });

            category.Name = model.Name;

            _context.Update(category);

            _context.SaveChanges();

            return Ok(category);
        }

       [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = _context.Categories.SingleOrDefault(x => x.Id == id);
            if (category == null)
            {
                return BadRequest(new { invalid = "Category is not found" });
            }

            _context.Remove(category);
            _context.SaveChanges();

            return Ok(category.Id);
        }
    }
}