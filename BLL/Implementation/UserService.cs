using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.BLL.Abstraction;
using WebSiteCore.BLL.Models;
using WebSiteCore.DAL.Entities;

namespace WebSiteCore.BLL.Implementation
{
    public class UserService : IUserService
    {
        readonly EFDbContext _context;
        readonly IFileService _fileService;
        public UserService(IFileService fileService, 
            EFDbContext context)
        {
            _fileService = fileService;
            _context = context;
        }
        public void AddUserProfile(string id, CustomRegisterModel model)
        {
            string path = _fileService.UploadImage(model.ImageBase64);
            var userImage = new UserImage
            {
                Id = id,
                Path = path
            };
            _context.UserImages.Add(userImage);
            _context.SaveChanges();

            var userProfile = new UserProfile
            {
                Id = id,
                FirstName = model.FirstName,
                MiddleName = model.MiddleName,
                LastName = model.LastName,
                DateOfBirth = model.DateOfBirth
            };
            _context.UserProfiles.Add(userProfile);
            _context.SaveChanges();
        }
    }
}
