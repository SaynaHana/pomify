using Microsoft.EntityFrameworkCore;
using Pomodoro.Models;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.Filters;

public static class UserApi 
{
    public static void MapUserEndpoints(this WebApplication app) 
    {
        /* Returns list of users */
        app.MapGet("/users", async (UserDb db) => await db.Users.ToListAsync());

        /* Creates a user */
        app.MapPost("/user", async (UserDb db, User user, string token) => 
        {
            // verify the given token 
            IResult tokenTask = await VerifyToken(token);

            // try to get uid
            if(tokenTask is Ok<string> uidResult) 
            {
                // if uid exists, then set user uid
                if(uidResult.Value != null) 
                {
                    string uid = uidResult.Value; 
                    user.Uid = uid;
                }
                else 
                {
                    return Results.NotFound();
                }
            }
            else 
            {
                return Results.NotFound();
            }

            // if we have a uid, check if the uid already exists in the database
            // if it does, then return an error
            bool userInDB = await UserInDB(db, user.Uid);

            if(userInDB) 
            {
                return Results.Conflict();
            }

            // get user's name from firebase
            UserRecord userRecord = await GetFBUserData(user.Uid);

            if(userRecord != null) 
            {
                user.Name = userRecord.DisplayName;
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
            return await VerifyToken(token);
        });
    }

    private static async Task<IResult> VerifyToken(string token) 
    {
        try 
        {
            // valid token
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

            return Results.Ok(decodedToken.Uid);
        }
        catch (Exception ex) 
        {
            // invalid token
            Console.WriteLine("Error: " + ex);
            return Results.NotFound();
        }
    }

    /* Returns true if a UID corresponds to a user that is already in the database */
    private static async Task<bool> UserInDB(UserDb db, string uid) 
    {
        return await db.Users.FirstOrDefaultAsync(u => u.Uid == uid) != null;
    }

    /* Given a uid, get user data from Firebase */
    private static async Task<UserRecord> GetFBUserData(string uid) 
    {
        return await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
    }
}