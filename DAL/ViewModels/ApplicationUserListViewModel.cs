using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.DAL.ViewModels
{
    public class ApplicationUserListViewModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public IList<string> Roles { get; set; }
    }
}
