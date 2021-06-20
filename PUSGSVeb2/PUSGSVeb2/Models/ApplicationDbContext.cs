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
        public DbSet<WorkRequest> WorkRequests { get; set; }
        public DbSet<WorkRequestBasicInfo> BasicInfos { get; set; }
        public DbSet<WorkRequestEquipments> Equipments { get; set; }
        public DbSet<WorkRequestHistoryOfChanges> HystoryOfChanges { get; set; }
        public DbSet<WorkRequestMultimedia> Multimedia { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamUser> TeamUsers { get; set; }
    }
}
