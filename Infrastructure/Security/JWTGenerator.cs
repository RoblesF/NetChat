using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
    public class JWTGenerator : IJWTGenerator
    {
        public string CreateToken(AppUser appUser)
        {
            List<Claim> claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId, appUser.UserName)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Definitely not a key")); //Key created

            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature); //Credentials created

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = credentials
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor); //Token created

            return tokenHandler.WriteToken(token);
        }
    }
}