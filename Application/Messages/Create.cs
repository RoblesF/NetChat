using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages
{
    public class Create
    {
        public class Command : IRequest<MessageDTO>
        {
            public string Content { get; set; }
            public Guid ChannelId { get; set; }
            public MessageType MessageType { get; set; } = MessageType.Text;
        }

        public class Handler : IRequestHandler<Command, MessageDTO>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<MessageDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                Channel channel = await _context.Channels.FindAsync(request.ChannelId);

                if (channel is null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { channel = "Channel not found" });
                }

                Message message = new Message
                {
                    Content = request.Content,
                    Channel = channel,
                    Sender = user,
                    CreatedAt = DateTime.Now,
                    MessageType = request.MessageType
                };

                await _context.Messages.AddAsync(message);

                if (await _context.SaveChangesAsync() > 0)
                {
                    return new MessageDTO
                    {
                        Sender = new User.UserDTO
                        {
                            UserName = user.UserName,
                            Avatar = user.Avatar
                        },
                        Content = message.Content,
                        CreatedAt = message.CreatedAt
                    };
                }

                throw new Exception("There was a problem inserting the message");
            }
        }
    }
}