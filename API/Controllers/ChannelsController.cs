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
    [ApiController]
    [Route("api/[controller]")]
    public class ChannelsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ChannelsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Channel>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{ChannelId}")]
        public async Task<ActionResult<Channel>> GetChannel(Guid ChannelId)
        {
            return await _mediator.Send(new Details.Query { Id = ChannelId });
        }

        [HttpPost]
        public async Task<Unit> CreateChannel(Create.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}