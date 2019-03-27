using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.BLL.Abstraction;
using WebSiteCore.BLL.Models;
using WebSiteCore.DAL.Entities;

namespace WebSiteCore.BLL.Implementation
{
    public class MicroblogService : IMicroblogService
    {
        private readonly EFDbContext _context;
        private readonly UserManager<DbUser> _userManager;

        public MicroblogService(EFDbContext context, UserManager<DbUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<OperationResult<MicroblogPublicModel>> CreatePost(MicroblogEditModel model)
        {
            var result = new OperationResult<MicroblogPublicModel>();

            var user = _userManager.Users.FirstOrDefault(x => x.Email == model.Email);
            if (user == null)
            {
                return result;
            }

            Microblog microblog = new Microblog()
            {
                UserId = user.Id,
                Name = model.Name,
                ShortDescription = model.ShortDescription,
                Description = model.Description,
                CreatedDate = DateTime.Now
            };


            _context.Microblogs.Add(microblog);
            await _context.SaveChangesAsync();

            result.IsSuccessful = true;
            result.Data = new MicroblogPublicModel()
            {
                Email = model.Email,
                CreatedAt = microblog.CreatedDate,
                Name = microblog.Name,
                ShortDescription = microblog.ShortDescription,
                Description = microblog.Description
            };

            return result;
        }

        public async Task<OperationResult<List<MicroblogPublicModel>>> Search()
        {
            var result = new OperationResult<List<MicroblogPublicModel>>();
            result.Data = _context.Microblogs.OrderByDescending(y=>y.CreatedDate).Include(x=>x.User).Select(s => new MicroblogPublicModel() { Name = s.Name, Email=s.User.Email, CreatedAt = s.CreatedDate, Description = s.Description, ShortDescription = s.ShortDescription }).ToList();
            result.IsSuccessful = true;
            return result;
        }
    }
}
