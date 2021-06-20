using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PUSGSVeb2.Models;

namespace PUSGSVeb2.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    [ApiController]
    public class TeamController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public TeamController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("AddTeam")]
        public async Task<ActionResult<Team>> AddTeam(TeamFront team)
        {
            //int brojac = 1;
            team.id = 0;
            if (team == null)
            {
                return BadRequest();
            }

            Team t = new Team();
            t.id = 0;
            t.name = team.name;
            try
            {
                _context.Teams.Add(t);

                await _context.SaveChangesAsync();

                if (team.teamMembers.Count != 0 && team.teamMembers != null)
                {
                    foreach (var item in team.teamMembers)
                    {
                        item.id = 0;
                        item.TeamIdd = t.id;
                    }
                    _context.TeamUsers.AddRange(team.teamMembers);
                    await _context.SaveChangesAsync();
                }

                var result = _context.Entry(team).Entity;
                return Ok(result);
            }
            catch (Exception e)
            {
                string s = e.Message;
            }

            return Ok(null);
        }

        [HttpGet]
        [Route("GetTeams")]
        public async Task<ActionResult<IEnumerable<TeamFront>>> GetTeams()
        {
            List<TeamFront> tfs = new List<TeamFront>();
            try
            {
                List<Team> timovi = new List<Team>();

                timovi = await _context.Teams.ToListAsync();

                foreach (var item in timovi)
                {
                    TeamFront tf = new TeamFront();
                    tf.id = item.id;
                    tf.teamMembers = new List<TeamUser>();
                    tf.name = item.name;
                    var memberi = _context.TeamUsers.Where(e => e.TeamIdd == item.id);
                    foreach (var item2 in memberi)
                    {

                        tf.teamMembers.Add(item2);

                    }
                    tfs.Add(tf);
                }
                return tfs;
            }
            catch (Exception e)
            {
                string s = e.Message;
                return null;
            }
        }

        [HttpPost]
        [Route("DeleteTeam/{id}")]
        public async Task<ActionResult<TeamFront>> DeleteTeam(int id)
        {
            List<Team> timovi = new List<Team>();
            List<TeamUser> memberi = new List<TeamUser>();

            timovi = await _context.Teams.Where(e => e.id == id).ToListAsync();
            memberi = await _context.TeamUsers.Where(e => e.TeamIdd == id).ToListAsync();

            _context.Teams.RemoveRange(timovi);
            _context.TeamUsers.RemoveRange(memberi);

            await _context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpPost]
        [Route("UpdateTeam")]
        public async Task<ActionResult<TeamFront>> UpdateTeam(TeamFront team)
        {

            try
            {
                if (team == null)
                {
                    return BadRequest();
                }

                Team tim = new Team();
                List<TeamUser> memberi = new List<TeamUser>();
                List<TeamUser> memberiTemp = new List<TeamUser>();
                Team timTemp = new Team();

                tim = await _context.Teams.FirstAsync(e => e.id == team.id);
                memberi = await _context.TeamUsers.Where(e => e.TeamIdd == team.id).ToListAsync();

                _context.Teams.Remove(tim);
                timTemp.id = team.id;
                timTemp.name = team.name;

                _context.Teams.Add(timTemp);
                await _context.SaveChangesAsync();

                _context.TeamUsers.RemoveRange(memberi);
                if (team.teamMembers.Count != 0 && team.teamMembers != null)
                {
                    foreach (var item in team.teamMembers)
                    {
                        memberiTemp.Add(item);
                    }
                    _context.TeamUsers.AddRange(memberiTemp);     
                }
                await _context.SaveChangesAsync();
                return Ok(team);
                
            }
            catch (Exception e)
            {
                string s = e.Message;
                return null;
            }

        }
    }
}