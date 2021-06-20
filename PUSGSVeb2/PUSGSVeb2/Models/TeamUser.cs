using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class TeamUser
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public string lastname { get; set; }

        public int TeamIdd { get; set; }
    }
}
