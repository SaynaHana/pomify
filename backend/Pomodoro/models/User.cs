using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

namespace Pomodoro.Models
{
    public class User
    {
        public int Id { get; set; } // id for database indexing
        public string? Uid { get; set; } // id from authentication server
        public int TimeSpent { get; set; } // cumulative time spent in "Pomodoro" mode in minutes
        public int Streak { get; set; } // days doing a Pomodoro
        public int MaxStreak {get; set; }
        public int StreakThreshold { get; set; } // how many minutes does the user have to be in "Pomodoro" mode for it to count towards the streak

        /* Returns a copy of a given user */
        public static User Copy(User o) 
        {
            User user = new User();

            user.Id = o.Id;
            user.Uid = o.Uid;
            user.TimeSpent = o.TimeSpent;
            user.Streak = o.Streak;
            user.MaxStreak = o.MaxStreak;
            user.StreakThreshold = o.StreakThreshold;

            return user;
        }
    }
}