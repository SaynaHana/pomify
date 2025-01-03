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
        /*
        app.MapGet("/users", async (UserDb db) => await db.Users.ToListAsync());
        */

        /* Returns a user using token */
        app.MapPost("/user/data", async (UserDb db, HttpRequest request) => 
        {
            // get uid from token
            IResult uidResult = await ApiUtil.GetUidFromToken(request);
            string? uid = ApiUtil.GetUIDFromResult(uidResult);

            if(uid != null) 
            {
                // note that the user gotten from here will have the uid removed for security reasons
                var user = await ApiUtil.GetUserByUid(db, uid);

                if(user != null) return Results.Ok(user);
            }

            return Results.NotFound();
        });

        /* Creates a user */
        app.MapPost("/user", async (UserDb db, User user, HttpRequest request) => 
        {
            // get uid from token
            IResult uidResult = await ApiUtil.GetUidFromToken(request);
            string? uid = ApiUtil.GetUIDFromResult(uidResult);

            if(uid != null) 
            {
                if(uid != null) 
                {
                    user.Uid = uid;
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
        /*
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
        */

        /* Deletes a user */
        app.MapDelete("/user/", async (UserDb db, HttpRequest request) => 
        {
            // get uid
            IResult uidResult = await ApiUtil.GetUidFromToken(request);
            string? uid = ApiUtil.GetUIDFromResult(uidResult);

            if(uid != null) 
            {
                // remove user from db
                User? user = await db.Set<User>().FirstOrDefaultAsync(u => u.Uid == uid);
                if(user != null) 
                {
                    db.Users.Remove(user);
                }

                // remove all daily users from db
                var dailyUserData = await db.DailyUsers
                                            .Where(d => d.Uid == uid)
                                            .ToListAsync();

                db.DailyUsers.RemoveRange(dailyUserData);

                // delete user from firebase
                await FirebaseAuth.DefaultInstance.DeleteUserAsync(uid);

                await db.SaveChangesAsync();
                return Results.Ok();
            }
            else 
            {
                return Results.NotFound();
            }
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