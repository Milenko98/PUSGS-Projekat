using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class ApplicationDbContext: IdentityDbContext
    {
        //EntityFrameworkCore\Add-Migration -Context ApplicationDbContext -OutputDir "Migrations/ApplicationDbContextMigrations"
        //EntityFrameworkCore\Update-Database -Context ApplicationDbContext

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> ApplicationUsers { get; set; }
    }
}
