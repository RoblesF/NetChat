using System.Threading.Tasks;
using Application.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : MyBaseController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserDTO>> SignIn(SignIn.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserDTO>> SignUp(SignUp.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}