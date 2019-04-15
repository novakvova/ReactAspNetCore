using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.DAL.Entities;
using WebSiteCore.GenericRepos.Abstract;

namespace WebSiteCore.GenericRepos.Repository
{
    public class EntityFrameworkRepository<TContext> : EntityFrameworkReadOnlyRepository<TContext>, IRepository
             where TContext : EFDbContext
    {
        public EntityFrameworkRepository(TContext context)
            : base(context)
        {
        }

        public virtual void Create<TEntity>(TEntity entity, string createdBy = null)
            where TEntity : class, IEntity
        {

            entity.CreatedDate = DateTime.UtcNow;
            entity.CreatedBy = createdBy;
            context.Set<TEntity>().Add(entity);
        }

        public virtual void Update<TEntity>(TEntity entity, string modifiedBy = null)
            where TEntity : class, IEntity
        {
            entity.ModifiedDate = DateTime.UtcNow;
            entity.ModifiedBy = modifiedBy;
            try
            {
                context.Entry(entity).State = EntityState.Detached;
                //context.Set<TEntity>().Attach(entity);
                context.Entry(entity).State = EntityState.Modified;
            }
            catch (Exception er)
            {

                throw new Exception(er.Message);
            }

        }

        public virtual void Delete<TEntity>(object id)
            where TEntity : class, IEntity
        {
            TEntity entity = context.Set<TEntity>().Find(id);
            Delete(entity);
        }

        public virtual void Delete<TEntity>(TEntity entity)
            where TEntity : class, IEntity
        {
            var dbSet = context.Set<TEntity>();
            if (context.Entry(entity).State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            dbSet.Remove(entity);
        }

        public virtual void Save()
        {
            try
            {
                context.SaveChanges();
            }
            catch (Exception e)
            {
                ThrowEnhancedValidationException(e);
            }
        }

        public virtual Task SaveAsync()
        {
            try
            {
                return context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                ThrowEnhancedValidationException(e);
            }

            return Task.FromResult(0);
        }

        protected virtual void ThrowEnhancedValidationException(Exception e)
        {
            //var errorMessages = e.Message
            //        .SelectMany(x => x.ValidationErrors)
            //        .Select(x => x.ErrorMessage);

            //var fullErrorMessage = string.Join("; ", errorMessages);
            //var exceptionMessage = string.Concat(e.Message, " The validation errors are: ", fullErrorMessage);
            //throw new Exception(exceptionMessage, e.Message);
        }
    }
}
