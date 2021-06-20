using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class User:IdentityUser
    {
        public string Firstname { get; set; }
     
        public string Lastname { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public string Picture { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Location { get; set; }

        public bool verifikovan { get; set; }

        public bool odbijen { get; set; }
    }
}
