using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class SignUp
    {
        public class Command : IRequest<UserDTO>
        {
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, UserDTO>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJWTGenerator _jwtGenerator;
            public Handler(UserManager<AppUser> userManager, IJWTGenerator jWTGenerator)
            {
                _userManager = userManager;
                _jwtGenerator = jWTGenerator;
            }
            public async Task<UserDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _userManager.FindByEmailAsync(request.Email) != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { SignUp = "Email already taken" });
                }

                if (await _userManager.FindByNameAsync(request.Username) != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { SignUp = "Username already taken" });
                }

                AppUser user = new AppUser
                {
                    Email = request.Email,
                    UserName = request.Username
                };

                IdentityResult result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    new UserDTO
                    {
                        Email = user.Email,
                        UserName = user.UserName,
                        Token = _jwtGenerator.CreateToken(user)
                    };
                }

                throw new RestException(HttpStatusCode.InternalServerError, new { SystemException = "Error registering user" });
            }
        }
    }
}