using System.Threading.Tasks;
using Application.Messages;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : MyBaseController
    {
        [HttpPost]
        public async Task<ActionResult<MessageDTO>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}