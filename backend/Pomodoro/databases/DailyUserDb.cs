using Microsoft.EntityFrameworkCore;
using Pomodoro.Models;

class DailyUserDb: DbContext 
{
    public DailyUserDb(DbContextOptions options) : base(options) {}
    public DbSet<DailyUserData> DailyUserSet { get; set; } = null!;
}