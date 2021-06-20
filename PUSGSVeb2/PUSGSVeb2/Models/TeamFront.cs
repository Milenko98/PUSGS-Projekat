using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class TeamFront
    {
        public int id { get; set; }

        public string name { get; set; }

        public ICollection<TeamUser> teamMembers { get; set; }
    }
}
