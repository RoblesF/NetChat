using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Channel> Channels { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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

            modelBuilder.Entity<Message>()
            .HasOne(x => x.Sender)
            .WithMany(x => x.Messages)
            .HasForeignKey(x => x.SenderId);
        }
    }
}
