using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudentAPI.Services.Interfaces;
using StudentAPI.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudentAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase {
        private readonly IAuthenticate _authenticateService;
        private readonly IConfiguration _configuration;

        public AccountController(IAuthenticate authenticateService, IConfiguration configuration) {
            _authenticateService = authenticateService ?? throw new ArgumentNullException(nameof(authenticateService));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<UserToken>> CreateUser([FromBody] RegisterModel Model) {
            if (Model.Password != Model.ConfirmPassword) {
                ModelState.AddModelError("ConfirmPassword", "Passwords do not match");
                return BadRequest(ModelState);
            }

            bool result = await _authenticateService.RegisterUser(Model.Email, Model.Password);

            if (!result) {
                ModelState.AddModelError("CreateUser", "Invalid User");
                return BadRequest(ModelState);
            }

            return Ok($"Usuário :{Model.Email} foi criado com sucesso.");
        }

        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserToken>> Login([FromBody] LoginModel UserInfo) {
            var result = await _authenticateService.Authenticate(UserInfo.Email, UserInfo.Password);

            if (!result) {
                ModelState.AddModelError("LoginUser", "Invalid Login.");
                return BadRequest(ModelState);
            }

            return GenerateToken(UserInfo);
        }

        private ActionResult<UserToken> GenerateToken(LoginModel userInfo) {
            Claim[] Claim = new[] {
                new Claim("email", userInfo.Email),
                new Claim("meuToken", "token do david"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            DateTime expiration = DateTime.UtcNow.AddMinutes(20);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: Claim,
                expires: expiration,
                signingCredentials: creds);

            return new UserToken {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
