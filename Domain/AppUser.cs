using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string Avatar { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}