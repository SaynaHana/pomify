using Pomodoro.Models;
using Microsoft.EntityFrameworkCore;

public class UserDb: DbContext 
{
    public UserDb(DbContextOptions options) : base(options) {}
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<DailyUserData> DailyUsers { get; set; } = null!;
}