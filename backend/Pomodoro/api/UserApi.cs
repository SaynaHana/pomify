using Microsoft.EntityFrameworkCore;
using Pomodoro.Models;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http.HttpResults;
using Pomodoro.Util;

public static class UserApi 
{
    public static void MapUserEndpoints(this WebApplication app) 
    {
        /* Returns list of users */
        app.MapGet("/users", async (UserDb db) => await db.Users.ToListAsync());

        /* Returns a user using token */
        app.MapPost("/user/data", async (UserDb db, HttpRequest request) => 
        {
            // get uid from token
            IResult uidResult = await ApiUtil.GetUidFromToken(request);

            if(uidResult is Ok<string> uid) 
            {
                if(uid.Value != null) 
                {
                    // note that the user gotten from here will have the uid removed for security reasons
                    var user = await ApiUtil.GetUserByUid(db, uid.Value);

                    if(user != null) return Results.Ok(user);
                }
            }

            return Results.NotFound();
        });

        /* Creates a user */
        app.MapPost("/user", async (UserDb db, User user, HttpRequest request) => 
        {
            // get uid from token
            IResult uidResult = await ApiUtil.GetUidFromToken(request);

            if(uidResult is Ok<string> uid) 
            {
                if(uid.Value != null) 
                {
                    user.Uid = uid.Value;
                }
            }

            // if we have a uid, check if the uid already exists in the database
            // if it does, then return an error
            bool userInDB = await ApiUtil.UserInDB(db, user.Uid);

            if(userInDB) 
            {
                return Results.Conflict();
            }

            // change max streak threshold to default is currently set to 0
            if(user.StreakThreshold == 0) {
                user.StreakThreshold = 25;
            }

            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();
            return Results.Created($"/user/{user.Id}", user);
        });

        /* Updates a user */
        app.MapPut("/user/{id}", async (UserDb db, User updateUser, int id) => 
        {
            var user = await db.Users.FindAsync(id);
            if(user is null) return Results.NotFound();
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
            return await ApiUtil.VerifyToken(token);
        });
    }

}