using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.GenericRepos.Abstract;

namespace WebSiteCore.GenericRepos.Repository
{
    public abstract class Entity<T> : IEntity<T>
    {
        [Key]
  
        public int Id { get; set; }
        //[Required(ErrorMessage = "Поле є обов'язковим")]
        public string Name { get; set; }

        private DateTime? createdDate;
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate
        {
            get { return createdDate ?? DateTime.UtcNow; }
            set { createdDate = value; }
        }
        private DateTime? modifiedDate;
        [DataType(DataType.DateTime)]
        public DateTime? ModifiedDate
        {
            get { return modifiedDate ?? DateTime.UtcNow; }
            set { modifiedDate = value; }
        }
        public string CreatedBy { get; set; } = "";

        public string ModifiedBy { get; set; } = "";
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        int IEntity.Id { get; set; }
    }
}
