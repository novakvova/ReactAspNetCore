using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class UserController : ControllerBase
    {
        readonly UserManager<DbUser> _userManager;
        public UserController(UserManager<DbUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/User
        [HttpGet]
        public IEnumerable<ApplicationUserListViewModel> Get(int? startIndex)
        {
            var list = new List<ApplicationUserListViewModel>();
            int index = startIndex ?? 0;
            var rawlist = _userManager.Users.Skip(index).Take(10).ToList();
            foreach (var user in rawlist)
            {
                list.Add(new ApplicationUserListViewModel()
                {
                    UserEmail = user.Email,
                    Roles = _userManager.GetRolesAsync(user).Result
                });
            }
            return list;
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
