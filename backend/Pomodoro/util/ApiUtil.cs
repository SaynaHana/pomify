using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using FirebaseAdmin.Auth;
using Pomodoro.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Pomodoro.Util
{
    public static class ApiUtil 
    {
        /* Parses token from authorization header */
        public static async Task<IResult> ParseToken(HttpRequest request) 
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
        public static async Task<IResult> VerifyToken(string token) 
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
        public static async Task<IResult> GetUidFromToken(HttpRequest request) 
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
        public static async Task<bool> UserInDB(UserDb db, string uid) 
        {
            return await db.Users.FirstOrDefaultAsync(u => u.Uid == uid) != null;
        }

        /* Returns the first user with the given Uid in the database */
        public static async Task<User> GetUserByUid(UserDb db, string uid) 
        {
            Console.WriteLine("UID: " + uid);
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
}