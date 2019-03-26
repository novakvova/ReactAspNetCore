using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.DAL.Entities
{
    [Table("tblCategories")]
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
