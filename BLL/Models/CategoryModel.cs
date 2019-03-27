using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.ActionFilters;

namespace WebSiteCore.BLL.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Cant't be empty")]
        public string Name { get; set; }
    }
}
