﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebSiteCore.GenericRepos.Abstract;

namespace WebSiteCore.DAL.Entities
{
    [Table("tblMicroblogs")]
    public class Microblog
    {
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
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }
    }
}
