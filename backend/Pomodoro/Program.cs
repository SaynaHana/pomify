using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

if(builder.Environment.IsProduction()) 
{
    builder.WebHost.UseUrls("http://0.0.0.0:5000", "https://0.0.0.0:5001");
    builder.Services.AddHttpsRedirection(options => {
        options.HttpsPort = 5001;
    });
}


/* Setup CORS */
builder.Services.AddCors(options => {
    options.AddPolicy(name: "PomodoroPolicy",
        policy => {
            policy.WithOrigins(builder.Configuration["AllowedOrigins"])
            .WithHeaders(HeaderNames.ContentType, HeaderNames.Authorization)
            .WithMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS");
        }
    ); 
});

/* Setup Firebase */
FirebaseApp.Create(new AppOptions() {
    Credential = GoogleCredential.GetApplicationDefault(),
    ProjectId = builder.Configuration.GetSection("Firebase")["ProjectId"]
});

/* Add User database with MySQL */
var connectionString = builder.Configuration.GetConnectionString("Default");
var serverVersion = ServerVersion.AutoDetect(connectionString);

builder.Services.AddDbContext<UserDb>(options => {
    options.UseMySql(connectionString, serverVersion);

    // optional logs for debugging
    if(builder.Environment.IsDevelopment()) 
    {
        options.LogTo(Console.WriteLine, LogLevel.Information);
        options.EnableSensitiveDataLogging();
        options.EnableDetailedErrors();
    }
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


if(builder.Environment.IsProduction()) 
{
    app.UseHttpsRedirection();
}

app.UseCors("PomodoroPolicy");

/* Map endpoints (found in UserApi.cs and DailyUserApi) */
app.MapUserEndpoints();
app.MapDailyUserEndpoints();

app.Run();
