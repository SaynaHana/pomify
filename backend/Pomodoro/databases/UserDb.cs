using Pomodoro.Models;
using Microsoft.EntityFrameworkCore;

public class UserDb: DbContext 
{
    public UserDb(DbContextOptions options) : base(options) {}
    public DbSet<User> Users { get; set; } = null!;
}