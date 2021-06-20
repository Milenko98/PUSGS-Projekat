using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using PUSGSVeb2.Models;

namespace PUSGSVeb2.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private readonly ApplicationSettings _appSettings;

        public UserController(UserManager<User> userManager,
            SignInManager<User> signInManager, IOptions<ApplicationSettings> appSettings, ApplicationDbContext c)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = c;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/User/Register
        public async Task<Object> Register(UserDB model)
        {
            //model.Username = model.Email;
            var user = new User
            {
                UserName = model.Username,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Email = model.Email,
                Password = model.Password,
                Role = model.Role,
                Picture = model.Picture,
                DateOfBirth = model.DateOfBirth,
                Location = model.Location
            };
            try
            {
                var result = await _userManager.CreateAsync(user, user.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/User/Login
        public async Task<IActionResult> Login(UserLogin model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //if (user.EmailConfirmed == false)
                //{
                //    return BadRequest(new { message = "Morate da aktivirate Vas nalog, link je poslat na Vas mejl." });
                //}

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("Roles", user.Role.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    // SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token, model.Email, user.Role });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }


        [HttpPost]
        [Route("SocialLogin")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> SocialLogin([FromBody]SocialLogIn loginModel)
        {
            var test = _appSettings.JWT_Secret;

            User userModel = new User();
            userModel.Email = loginModel.Email;
            userModel.Firstname = loginModel.Ime;
            userModel.Lastname = loginModel.Prezime;
            userModel.Role = "Registrovan";
            userModel.UserName = loginModel.UserName;



            if (_userManager.FindByEmailAsync(userModel.Email).Result == null)
            {
                var result = await _userManager.CreateAsync(userModel);
            }

            if (VerifyToken(loginModel.IdToken))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    //Key min: 16 characters
                    // SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token, userModel.UserName, userModel.Role });
            }

            return Ok();
        }
        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

        public bool VerifyToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                return false;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

            return true;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<ActionResult<IEnumerable<UserFront>>> GetUsers()
        {
            List<User> users = new List<User>();
            List<UserFront> usersFront = new List<UserFront>();

            users = await _userManager.Users.ToListAsync();
            
            foreach(var item in users)
            {
                if (item.Role == "Clan ekipe")
                {
                    UserFront uf = new UserFront();
                    uf.name = item.Firstname;
                    uf.lastname = item.Lastname;
                    usersFront.Add(uf);
                }
            }

            return usersFront;
        }
    }
}