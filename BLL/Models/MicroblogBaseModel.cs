using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.BLL.Models
{
    public class MicroblogEditModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
    }

    public class MicroblogPublicModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
