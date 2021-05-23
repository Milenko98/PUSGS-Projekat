using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVS.Models
{
  public class CRUD_ExampleContext : DbContext
  {

    //EntityFrameworkCore\Add-Migration -Context DBContext -OutputDir "Migrations/DBContextMigrations
    //EntityFrameworkCore\Update-Database -Context DBContext

    public CRUD_ExampleContext(DbContextOptions<CRUD_ExampleContext> options) : base(options)
    {

    }

    public DbSet<User> ApplicationUsers { get; set; }
  }
}
