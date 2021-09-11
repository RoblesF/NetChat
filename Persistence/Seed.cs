using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{
                        Id = "1",
                        UserName = "Smith",
                        Email = "Smith@domain.org"
                    },
                    new AppUser{
                        Id = "2",
                        UserName = "Annie",
                        Email = "Annie@domain.org"
                    },
                    new AppUser{
                        Id = "3",
                        UserName = "Elizabeth",
                        Email = "Elizabeth@domain.org"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
}