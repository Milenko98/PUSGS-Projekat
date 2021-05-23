using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVS.Models
{
  public class ApplicationDbContext : DbContext
  {

        //EntityFrameworkCore\Add-Migration -Context ApplicationDbContext -OutputDir "Migrations/ApplicationDbContextMigrations"
        //EntityFrameworkCore\Update-Database -Context ApplicationDbContext

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public DbSet<User> ApplicationUsers { get; set; }
  }
}
