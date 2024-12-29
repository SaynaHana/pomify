using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pomodoro.Models;
using Pomodoro.Util;

public static class DailyUserApi
{
    public static void MapDailyUserEndpoints(this WebApplication app) 
    {
        /* Gets current server date */
        app.MapGet("/date", async () => {
            return DateTime.Today.ToString("d");
        });

        /* Adds or updates a new row to daily user table with new time spent */
        app.MapPost("/daily_user", async (UserDb db, HttpRequest request, DailyUserData dailyData) => {
            // get current date            
            string date = DateTime.Today.ToString("d");

            // check if a row with the current date and uid already exists
            // get the uid 
            IResult uidResult = await ApiUtil.GetUidFromToken(request);
            string? uid = ApiUtil.GetUIDFromResult(uidResult);

            Console.WriteLine("Time spent: " + dailyData.TimeSpent);

            if(uid != null) 
            {
                DailyUserData? daily = await db.Set<DailyUserData>().FirstOrDefaultAsync(d => d.Uid == uid && d.Date == date);

                // case 1: the user has already used the app at least one time
                if(daily != null) 
                {
                    // update time spent 
                    daily.TimeSpent += dailyData.TimeSpent;

                    await db.SaveChangesAsync();
                }
                // case 2: the user is using the app for the first time today
                else 
                {
                    // create new entry
                    DailyUserData newData = new DailyUserData(uid, date, dailyData.TimeSpent);

                    await db.AddAsync(newData);
                    await db.SaveChangesAsync();
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