using Microsoft.AspNetCore.Identity.UI.Pages.Account.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.BLL.Models;

namespace WebSiteCore.BLL.Abstraction
{
    public interface IUserService
    {
        void AddUserProfile(string id, CustomRegisterModel model);

        UserProfileModel GetUserProfile(string id);
    }
}