using Microsoft.EntityFrameworkCore;
using Pomodoro.Models;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using FirebaseAdmin.Messaging;

public static class UserApi 
{
    public static void MapUserEndpoints(this WebApplication app) 
    {
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

        /* 
            Verifies ID tokens from Firebase Admin SDK and returns UID
            Used for all authentication
        */
        app.MapPost("/verify_token", async (UserDb db, string token) => {
            try {
                // valid token
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

                return Results.Ok(decodedToken.Uid);
            }
            catch (Exception ex) {
                // invalid token
                Console.WriteLine("Error: " + ex);
                return Results.NotFound();
            }
        });
    }
}