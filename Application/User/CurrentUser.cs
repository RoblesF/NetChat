using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<UserDTO>
        {

        }

        public class Handler : IRequestHandler<Query, UserDTO>
        {
            private readonly IUserAccessor _iUserAccessor;
            private readonly UserManager<AppUser> _iUserManager;
            private readonly IJWTGenerator _iJwtGenerator;
            public Handler(IUserAccessor iUserAccessor, UserManager<AppUser> iUserManager, IJWTGenerator iJwtGenerator)
            {
                _iUserAccessor = iUserAccessor;
                _iUserManager = iUserManager;
                _iJwtGenerator = iJwtGenerator;
            }
            public async Task<UserDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _iUserManager.FindByNameAsync(_iUserAccessor.GetCurrentUserName());

                return new UserDTO
                {
                    UserName = user.UserName,
                    Token = _iJwtGenerator.CreateToken(user),
                    Email = user.Email
                };
            }
        }
    }
}