using Microsoft.EntityFrameworkCore;
using StudentAPI.Model;

namespace StudentAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {
        }
        public DbSet<Student> Students { get; set; }
    }
}
