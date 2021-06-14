using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class UserDB
    {
        public string Username { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public string Picture { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Location { get; set; }
    }
}
