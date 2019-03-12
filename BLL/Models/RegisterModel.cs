using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.ActionFilters;

namespace WebSiteCore.BLL.Models
{
    public class CustomRegisterModel
    {
        [CustomEmailAttribute(ErrorMessage = "Already exist")]
        [Required(ErrorMessage = "Cant't be empty")]
        [EmailAddress(ErrorMessage = "Invalid email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Cant't be empty")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 6 characters and contain digits, upper and lower case")]
        public string Password { get; set; }


        [Required(ErrorMessage = "Cant't be empty")]
        //[RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 8 characters and contain digits, upper and lower case")]
        [Compare("Password", ErrorMessage = "Passwords are different")]
        public string ConfirmPassword { get; set; }
    }
}
