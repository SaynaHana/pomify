using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

var builder = WebApplication.CreateBuilder(args);

/* Setup Firebase */
FirebaseApp.Create(new AppOptions() {
    Credential = GoogleCredential.GetApplicationDefault(),
    ProjectId = "pomodoro-87ff7"
});

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

/* Map endpoints (found in UserApi.cs) */
app.MapUserEndpoints();

app.Run();
