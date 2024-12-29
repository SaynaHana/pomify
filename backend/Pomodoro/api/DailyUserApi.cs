using Microsoft.EntityFrameworkCore;
using Pomodoro.Models;
using Pomodoro.Util;

public static class DailyUserApi
{
    public static void MapDailyUserEndpoints(this WebApplication app) 
    {
        /* Gets current server date */
        app.MapGet("date", async () => {
            return DateTime.Today.ToString("d");
        });

        /* Adds or updates a new row to daily user table with new time spent */
        app.MapPost("/daily_user", async (UserDb db, HttpRequest request, int timeSpent) => {
            // get current date            
            string date = DateTime.Today.ToString("d");

            // check if a row with the current date and uid already exists
            // get the uid 
            IResult uidResult = await ApiUtil.GetUidFromToken(request);
            string? uid = ApiUtil.GetUIDFromResult(uidResult);

            if(uid != null) 
            {
                // check if there is an entry in the daily users table with the current date and uid
                DailyUserData? daily = await db.DailyUsers.FirstOrDefaultAsync(u => u.Uid == uid && u.Date == date);

                // case 1: the row does exist (i.e the user already spent time today)
                if(daily != null) 
                {
                    // update the time spent
                    daily.TimeSpent += timeSpent;

                    await db.SaveChangesAsync();
                }
                // case 2: the row does not exist (i.e this is the first time the user is using the app today)
                else 
                {
                    // create new row and add to database
                    DailyUserData newDaily = new DailyUserData(uid, date, timeSpent);

                    await db.AddAsync(newDaily);
                }
            }
            else 
            {
                return Results.NotFound();
            }

            return Results.Ok();
        });
    }
}