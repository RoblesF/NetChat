using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Channels;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ChannelsController : MyBaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<Channel>>> GetChannels()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{ChannelId}")]
        public async Task<ActionResult<Channel>> GetChannel(Guid ChannelId)
        {
            return await Mediator.Send(new Details.Query { Id = ChannelId });
        }

        [HttpPost]
        public async Task<Unit> CreateChannel(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}