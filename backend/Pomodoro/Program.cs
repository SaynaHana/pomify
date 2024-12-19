using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Pomodoro.Models;

var builder = WebApplication.CreateBuilder(args);

/* Add User database */
builder.Services.AddDbContext<UserDb>(options => options.UseInMemoryDatabase("items"));

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
app.MapPost("/user", async (UserDb db, User user) => {
    await db.Users.AddAsync(user);
    await db.SaveChangesAsync();
    return Results.Created($"/user/{user.Id}", user);
});

app.Run();
