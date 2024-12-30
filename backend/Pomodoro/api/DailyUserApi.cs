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

            if(uid != null) 
            {
                DailyUserData? daily = await db.Set<DailyUserData>().FirstOrDefaultAsync(d => d.Uid == uid && d.Date == date);
                User? user = await db.Set<User>().FirstOrDefaultAsync(u => u.Uid == uid);

                if(user != null) 
                {
                    user.TimeSpent += dailyData.TimeSpent;
                }

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

                    // increment streak
                    if(user != null) 
                    {
                        user.Streak++; 

                        if(user.Streak > user.MaxStreak) 
                        {
                            user.MaxStreak = user.Streak;
                        }
                    }

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

        /* Checks if user is still maintaining a streak. If the user does not have a streak, then reset streak */
        app.MapPost("/streak", async (UserDb db, HttpRequest request) => {
            // get yesterday's date
            string date = DateTime.Today.AddDays(-1).ToString("d");

            // check if there is an entry in the daily user data table to see if the user used the app yesterday    
            // get uid
            IResult uidResult = await ApiUtil.GetUidFromToken(request);
            string? uid = ApiUtil.GetUIDFromResult(uidResult);

            if(uid != null) 
            {
                DailyUserData? daily = await db.Set<DailyUserData>().FirstOrDefaultAsync(d => d.Uid == uid && d.Date == date);

                // if there is no entry for the yesterday's date, then reset streak
                // find user
                User? user = await db.Set<User>().FirstOrDefaultAsync(u => u.Uid == uid);

                if(user != null) 
                {
                    user.Streak = 0;
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