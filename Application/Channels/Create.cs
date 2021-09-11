using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Channels
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Name { get; set; }
            public string Description { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Channel channel = new Channel
                {
                    Name = request.Name,
                    Description = request.Description
                };

                await _context.Channels.AddAsync(channel);
                bool success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Ocurrió un problema al guardar los datos");
            }
        }
    }
}