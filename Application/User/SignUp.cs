using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
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
            public CommandValidator(UserManager<AppUser> userManager)
            {
                RuleFor(x => x.Username)
                .NotEmpty()
                .MustAsync(async (username, cancellation) => await userManager.FindByNameAsync(username) == null)
                .WithMessage("Username already exists");
                RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .MustAsync(async (email, cancellation) => await userManager.FindByEmailAsync(email) == null)
                .WithMessage("Email already exists");
                RuleFor(x => x.Password).Password();
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
                AppUser user = new AppUser
                {
                    Email = request.Email,
                    UserName = request.Username
                };

                IdentityResult result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new UserDTO
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