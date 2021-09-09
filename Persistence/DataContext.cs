using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DbSet<Channel> Channels { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Channel>().HasData(new Channel
            {
                Id = Guid.NewGuid(),
                Name = "DotNetCore",
                Description = "Canal dedicado a dotnet core"
            },
            new Channel
            {
                Id = Guid.NewGuid(),
                Name = "Angular",
                Description = "Canal dedicado a AngularJS"
            },
            new Channel
            {
                Id = Guid.NewGuid(),
                Name = "React JS",
                Description = "Canal dedicado a React JS"
            });
        }
    }
}
