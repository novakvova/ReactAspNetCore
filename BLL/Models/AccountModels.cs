using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.BLL.Models
{
    public class Credentials
    {
        [Required(ErrorMessage = "Поле є обов'язковим")]
        [EmailAddress(ErrorMessage = "Не валідна пошта")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Поле є обов'язковим")]
        public string Password { get; set; }
    }
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Cant't be empty")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 6 characters and contain digits, upper and lower case")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Cant't be empty")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 6 characters and contain digits, upper and lower case")]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ChangePasswordViewModel
    {
        [Required]
        public string Id { get; set; }
        [Required(ErrorMessage = "Cant't be empty")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 6 characters and contain digits, upper and lower case")]
        public string OldPassword { get; set; }
        [Required(ErrorMessage = "Cant't be empty")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 6 characters and contain digits, upper and lower case")]
        public string NewPassword { get; set; }
    }
}
