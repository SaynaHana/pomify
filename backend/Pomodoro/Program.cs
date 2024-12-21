using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using Pomodoro.Models;

var builder = WebApplication.CreateBuilder(args);

/* Add User database with MySQL */
var connectionString = builder.Configuration.GetConnectionString("Default");
var serverVersion = ServerVersion.AutoDetect(connectionString);

builder.Services.AddDbContext<UserDb>(options => {
    options.UseMySql(connectionString, serverVersion);

    // TODO: Remove the following 3 lines (which are for debugging)
    options.LogTo(Console.WriteLine, LogLevel.Information);
    options.EnableSensitiveDataLogging();
    options.EnableDetailedErrors();
});

/* Add Swagger header */
builder.Services.AddEndpointsApiExplorer();
if(builder.Environment.IsDevelopment()) 
{
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Pomodoro API", Description = "Keeps track of Pomodoro user data like days accessed, time spent, etc...", Version = "v1"});
    });
}

var app = builder.Build();


/* Use Swagger */
if(builder.Environment.IsDevelopment()) 
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pomodoro API V1");
    });
}

/* Returns list of users */
app.MapGet("/users", async (UserDb db) => await db.Users.ToListAsync());

/* Creates a user */
app.MapPost("/user", async (UserDb db, User user) => 
{
    await db.Users.AddAsync(user);
    await db.SaveChangesAsync();
    return Results.Created($"/user/{user.Id}", user);
});

/* Updates a user */
app.MapPut("/user/{id}", async (UserDb db, User updateUser, int id) => 
{
    var user = await db.Users.FindAsync(id);
    if(user is null) return Results.NotFound();
    user.Name = updateUser.Name;
    user.TimeSpent = updateUser.TimeSpent;
    user.Streak = updateUser.Streak;
    user.MaxStreak = updateUser.MaxStreak;
    user.StreakThreshold = updateUser.StreakThreshold;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

/* Deletes a user */
app.MapDelete("/user/{id}", async (UserDb db, int id) => 
{
    var user = await db.Users.FindAsync(id);
    if(user is null) 
    {
        return Results.NotFound();
    }

    db.Users.Remove(user);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.Run();
