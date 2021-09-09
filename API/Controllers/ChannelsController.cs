using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChannelsController : ControllerBase
    {
        private readonly DataContext _dbContext;
        public ChannelsController(DataContext dataContext)
        {
            _dbContext = dataContext;
        }

        public async Task<IActionResult> GetChannels()
        {
            var channels = await _dbContext.Channels.ToListAsync();
            return Ok(channels);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetChannel(Guid id)
        {
            var channel = await _dbContext.Channels.FindAsync(id);
            if (channel is null)
            {
                return NotFound();
            }
            return Ok(channel);
        }
    }
}