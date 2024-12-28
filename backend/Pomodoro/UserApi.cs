using Microsoft.EntityFrameworkCore;
using Pomodoro.Models;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http.HttpResults;

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
            IResult uidResult = await GetUidFromToken(request);

            if(uidResult is Ok<string> uid) 
            {
                if(uid.Value != null) 
                {
                    // note that the user gotten from here will have the uid removed for security reasons
                    var user = await GetUserByUid(db, uid.Value);

                    if(user != null) return Results.Ok(user);
                }
            }

            return Results.NotFound();
        });

        /* Creates a user */
        app.MapPost("/user", async (UserDb db, User user, HttpRequest request) => 
        {
            // get uid from token
            IResult uidResult = await GetUidFromToken(request);

            if(uidResult is Ok<string> uid) 
            {
                if(uid.Value != null) 
                {
                    user.Uid = uid.Value;
                }
            }

            // if we have a uid, check if the uid already exists in the database
            // if it does, then return an error
            bool userInDB = await UserInDB(db, user.Uid);

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
            return await VerifyToken(token);
        });
    }

    /* Parses token from authorization header */
    private static async Task<IResult> ParseToken(HttpRequest request) 
    {
        // get token from authorization header
        if(request.Headers.ContainsKey("Authorization") &&
            request.Headers["Authorization"][0].StartsWith("Bearer ")) 
        {
            return Results.Ok(request.Headers["Authorization"][0].Substring("Bearer ".Length));
        }
        else 
        {
            return Results.BadRequest();
        }
    }


    /* Verifies token. Returns UID if no error */
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

    /* Returns the Uid from token given by authorization header if there are no errors */
    private static async Task<IResult> GetUidFromToken(HttpRequest request) 
    {
        // parse token
        IResult parsedResult = await ParseToken(request);

        if(parsedResult is Ok<string> token) 
        {
            if(token.Value != null) 
            {
                // verify token which returns uid
                IResult uidResult = await VerifyToken(token.Value); 
                
                if(uidResult is Ok<string> uid) 
                {
                    return Results.Ok(uid.Value); 
                }
                else {
                    return Results.BadRequest();
                }
            }
            else 
            {
                return Results.BadRequest();
            }
        }
        else 
        {
            return Results.BadRequest();
        }
    }

    /* Returns true if a Uid corresponds to a user that is already in the database */
    private static async Task<bool> UserInDB(UserDb db, string uid) 
    {
        return await db.Users.FirstOrDefaultAsync(u => u.Uid == uid) != null;
    }

    /* Returns the first user with the given Uid in the database */
    private static async Task<User> GetUserByUid(UserDb db, string uid) 
    {
        // find the user in the database
        User user = await db.Users.FirstOrDefaultAsync(u => u.Uid == uid);

        if(user != null) 
        {
            // create copy of user and remove the uid
            User copy = User.Copy(user);

            copy.Uid = null;

            return copy;
        }

        return user;
    }
}