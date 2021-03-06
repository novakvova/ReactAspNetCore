﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebSiteCore.Model;

namespace WebSiteCore.DAL.Entities
{
    public class EFDbContext : IdentityDbContext<DbUser>
    {
        public EFDbContext(DbContextOptions<EFDbContext> options)
            : base(options)
        {

        }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<UserImage> UserImages { get; set; }
        public DbSet<Tags> Tags { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Microblog> Microblogs { get; set; }
    }
}
