using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebSiteCore.DAL.Entities;
using WebSiteCore.DAL.ViewModels;

namespace WebSiteCore.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        readonly UserManager<DbUser> _userManager;
        public UserController(UserManager<DbUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/User
        [HttpGet("list")]
        public IEnumerable<ApplicationUserListViewModel> Get()
        {
            
            var model= _userManager.Users.Select(u=>new ApplicationUserListViewModel
            {
                Id = u.Id,
                Email = u.Email
            }).ToList();
           
            return model;
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
