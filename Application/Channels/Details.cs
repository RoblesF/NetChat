using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Channels
{
    public class Details
    {
        public class Query : IRequest<Channel>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Channel>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Channel> Handle(Query request, CancellationToken cancellationToken)
            {
                var channel = await _context.Channels.Include(x => x.Messages).ThenInclude(x => x.Sender).SingleOrDefaultAsync(x => x.Id == request.Id);

                if (channel is null)
                    throw new RestException(HttpStatusCode.NotFound, new { channel = "Not found" });

                return channel;
            }
        }
    }
}