using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.DAL.ViewModels
{
    public class ApplicationUserListViewModel
    {
        public string UserEmail { get; set; }
        public IList<string> Roles { get; set; }
    }
}
