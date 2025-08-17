using Microsoft.EntityFrameworkCore;
using JobTrackerApi.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<JobApplication> JobApplications { get; set; }
}
