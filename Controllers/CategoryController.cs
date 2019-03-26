using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebSiteCore.BLL.Models;
using WebSiteCore.DAL.Entities;

namespace WebSiteCore.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly EFDbContext _context;

        public CategoryController(EFDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var categories = _context.Categories.Select(x => new CategoryModel { Id = x.Id, Name = x.Name }).ToList();

            return Ok(categories);
        }

        [HttpPost]
        public IActionResult Add([FromBody] CategoryModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Categories.Where(x => x.Name == model.Name).Count() != 0)
            {
                return BadRequest(new { error = "Category is alredy created" });

            }
            var category = new Category { Name = model.Name };
            _context.Categories.Add(category);
            _context.SaveChanges();

            return Ok(category);
        }

        [HttpPut("{id}")]
        public IActionResult PutCategory([FromRoute] int id, [FromBody] CategoryModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = _context.Categories.SingleOrDefault(x => x.Id == id);

            if(category==null)
                return BadRequest(new { error = "Category is not found" });

            category.Name = model.Name;

            _context.Update(category);

            _context.SaveChanges();

            return Ok(category);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = _context.Categories.SingleOrDefault(x => x.Id == id);
            if (category == null)
            {
                return BadRequest(new { error = "Category is not found" });
            }

            _context.Remove(category);
            _context.SaveChanges();

            return Ok(category.Id);
        }
    }
}