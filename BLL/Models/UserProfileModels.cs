using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.BLL.Models
{
    public class UserProfileGetModel
    {
        [Required]
        public string Id { get; set; }
    }

    public class UserProfileModel
    {
        public string Email { get; set; }
        public string UserImage { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
    }
}
