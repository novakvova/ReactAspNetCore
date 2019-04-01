using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.BLL.Models
{
    public class UserProfileModel
    {
        [Required]
        public string Id { get; set; }
    }

    public class UserProfileGetModel
    {
        public string Email { get; set; }
        public string ImageBase64 { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
