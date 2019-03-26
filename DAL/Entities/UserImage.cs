using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.DAL.Entities
{
    [Table("tblUserImages")]
    public class UserImage
    {
        [ForeignKey("User"), Key]
        public string Id { get; set; }
        public string Path { get; set; }
        public virtual DbUser User { get; set; }

    }
}
