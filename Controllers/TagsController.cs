using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebSiteCore.DAL.Entities;
using WebSiteCore.GenericRepos.Abstract;
using WebSiteCore.Model;

namespace WebSiteCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : Controller
    {
        private readonly IRepository _context;

        public TagsController(IRepository context)
        {
            _context = context;
        }

        // GET: api/Tags
        [HttpGet]
        public IEnumerable<Tags> GetTags()
        {
                //var _context.GetAll<Tags>()
            return _context.GetAll<Tags>();
        }

        // GET: api/Tags/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTags([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tags = await _context.GetByIdAsync<Tags>(id);

            if (tags == null)
            {
                return NotFound();
            }

            return Ok(tags);
        }

        // PUT: api/Tags/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTags([FromRoute] int id, [FromBody] Tags tags)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tags.Id)
            {
                return BadRequest();
            }

            _context.Update(tags);

            try
            {
                await _context.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tags
        [HttpPost]
        public async Task<IActionResult> PostTags([FromBody] Tags tags)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Create(tags);
            await _context.SaveAsync();

            return CreatedAtAction("GetTags", new { id = tags.Id }, tags);
        }

        // DELETE: api/Tags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTags([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tags = await _context.GetByIdAsync<Tags>(id);
            if (tags == null)
            {
                return NotFound();
            }

            _context.Delete(tags);
            await _context.SaveAsync();

            return Ok(tags);
        }

        private bool TagsExists(int id)
        {
            return _context.GetExists<Tags>(e => e.Id == id);
        }
    }
}