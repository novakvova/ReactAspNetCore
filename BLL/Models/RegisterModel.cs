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
        [CustomEmailAttribute(ErrorMessage = "Уже зареэстрована")]
        [Required(ErrorMessage = "Поле є обов'язковим")]
        [EmailAddress(ErrorMessage = "Не правильно введена пошта")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Поле є обов'язковим")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 8 characters and contain digits, upper and lower case")]
        public string Password { get; set; }


        [Required(ErrorMessage = "Поле є обов'язковим")]
        //[RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 8 characters and contain digits, upper and lower case")]
        [Compare("Password", ErrorMessage = "Passwords are different")]
        public string ConfirmPassword { get; set; }
    }
}
