using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebSiteCore.GenericRepos.Abstract;

namespace WebSiteCore.DAL.Entities
{
    [Table("tblMicroblogs")]
    public class Microblog : IEntity<Microblog>
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        [Required]
        [StringLength(maximumLength: 255)]
        public string Name { get; set; }
        [Required]
        [StringLength(maximumLength: 1000)]
        public string ShortDescription { get; set; }
        [StringLength(maximumLength: 50000)]
        public string Description { get; set; }
        public virtual DbUser User { get; set; }

        //Hello Max
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}
