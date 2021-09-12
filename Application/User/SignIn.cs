using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class SignIn
    {
        public class Query : IRequest<UserDTO>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, UserDTO>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
            {
                _userManager = userManager;
                _signInManager = signInManager;
            }

            public async Task<UserDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                AppUser user = await _userManager.FindByEmailAsync(request.Email);

                if (user is null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "404 Not found" });
                }

                SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    // ToDo: Generate TOKEN
                    return new UserDTO
                    {
                        Token = "todo generate token",
                        UserName = user.UserName,
                        Email = user.Email
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}