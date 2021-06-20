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
        public async Task<Object> Register(UserDB model)
        {
            try
            {
                var lista = await _context.ApplicationUsers.ToListAsync();

                if (lista.Count != 0)
                {
                     var userr =  lista.Any(e => e.Email == model.Email);

                    if (userr)
                    {
                        return BadRequest();
                    }
                }
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
                    Location = model.Location,
                    verifikovan = model.verifikovan,
                    odbijen = model.odbijen
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
            catch (Exception e)
            {
                string s = e.Message;
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(UserLogin model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null || await _userManager.CheckPasswordAsync(user, model.Password) == false)
            {
                return Ok("Pogresna lozinka ili username.");
            }
            else
            {
                if(user.odbijen == true && user.Role != "Administrator")
                {
                    return Ok("Odbijen si.");
                }
                else if (user.verifikovan == false && user.Role != "Administrator")
                {
                    return Ok("Niste verifikovani.");
                }
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("Roles", user.Role.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token, model.Email, user.Role });
            }
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
            List<TeamUser> UseriUTimu = new List<TeamUser>();
            List<User> sviUseri = new List<User>();
            List<User> useriBezTimova = new List<User>();

            sviUseri = await _userManager.Users.ToListAsync();

            UseriUTimu = await _context.TeamUsers.ToListAsync();

            foreach (var item in sviUseri)
            {
                useriBezTimova.Add(item);
            }

            foreach (var item2 in UseriUTimu)
            {
                foreach (var item in sviUseri)
                {
                    if (item.Firstname == item2.name && item.Lastname == item2.lastname)
                    {
                        useriBezTimova.Remove(item);
                        break;
                    }
                }
            }


            foreach (var item in useriBezTimova)
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



        [HttpGet]
        [Route("GetUsersForVerification")]
        public async Task<ActionResult<IEnumerable<UserDB>>> GetUsersForVerification()
        {
            List<User> useri = new List<User>();
            List<UserDB> uf = new List<UserDB>();

            useri = await _userManager.Users.Where(e => e.Role != "Administrator").ToListAsync();

            if (useri != null && useri.Count != 0)
            {
                foreach (var item in useri)
                {
                    UserDB u = new UserDB();
                    u.Username = item.UserName;
                    u.Firstname = item.Firstname;
                    u.Lastname = item.Lastname;
                    u.Email = item.Email;
                    u.verifikovan = item.verifikovan;
                    u.odbijen = item.odbijen;
                    uf.Add(u);
                }
            }
            return uf;
        }

        [HttpPost]
        [Route("ApproveUser/{email}")]
        public async Task<ActionResult<string>> ApproveUser(string email)
        {
            List<User> useri = new List<User>();
            User u = new User();
            useri = await _userManager.Users.ToListAsync();

            foreach (var item in useri)
            {
                if (item.Email == email)
                {
                    if(item.odbijen == true)
                    {
                        return Ok(null);
                    }
                    else if(item.verifikovan == true)
                    {
                        return Ok(null);
                    }
                    item.verifikovan = true;
                    u = item;
                }
            }

            await _context.SaveChangesAsync();

            if (u != null)
            {
                return Ok(u);
            }
            return Ok(null);
        }

        [HttpPost]
        [Route("DenyUser/{email}")]
        public async Task<ActionResult<string>> DenyUser(string email)
        {
            try
            {
                List<User> useri = new List<User>();
                User u = new User();
                useri = await _userManager.Users.ToListAsync();

                foreach (var item in useri)
                {
                    if (item.Email == email)
                    {
                        if (item.verifikovan == true || item.odbijen == true)
                        {
                            return Ok("verifikovan");
                        }
                        item.odbijen = true;
                        u = item;
                    }
                }

                await _context.SaveChangesAsync();

                if (u != null)
                {
                    return Ok(u);
                }
                return Ok(null);
            }
            catch(Exception e)
            {
                string s = e.Message;
                return Ok(null);
            }
        }
    }
}