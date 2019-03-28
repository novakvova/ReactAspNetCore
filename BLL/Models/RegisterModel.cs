using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.Helpers;

namespace WebSiteCore.BLL.Models
{
    public class CustomRegisterModel
    {
        [CustomEmail(ErrorMessage = "Already exist")]
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
        [Required(ErrorMessage = "Cant't be empty")]
        public string ImageBase64 { get; set; }
        [Required(ErrorMessage = "Cant't be empty")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Cant't be empty")]
        public string MiddleName { get; set; }
        [Required(ErrorMessage = "Cant't be empty")]
        public string LastName { get; set; }
        [CustomDateTime(ErrorMessage = "Date is out of Range")]
        public DateTime DateOfBirth { get; set; }
    }
}
