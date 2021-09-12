using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UsersController : MyBaseController
    {
        [HttpPost]
        public async Task<ActionResult<UserDTO>> SignIn(SignIn.Query query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> SignUp(SignUp.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}