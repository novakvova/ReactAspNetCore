using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.GenericRepos.Abstract
{
    public interface IModifiableEntity
    {
        string Name { get; set; }
    }

    public interface IEntity : IModifiableEntity
    {
        int Id { get; set; }
        DateTime CreatedDate { get; set; }
        DateTime? ModifiedDate { get; set; }
        string CreatedBy { get; set; }
        string ModifiedBy { get; set; }
    }

    public interface IEntity<T> : IEntity
    {
        new int Id { get; set; }
    }
}
