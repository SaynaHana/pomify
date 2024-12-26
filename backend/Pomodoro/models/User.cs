using Microsoft.EntityFrameworkCore;

namespace Pomodoro.Models
{
    public class User
    {
        public int Id { get; set; } // id for database indexing
        public string? Uid { get; set; } // id from firebase authentication
        public int TimeSpent { get; set; } // cumulative time spent in "Pomodoro" mode in minutes
        public int Streak { get; set; } // days doing a Pomodoro
        public int MaxStreak {get; set; }
        public int StreakThreshold { get; set; } // how many minutes does the user have to be in "Pomodoro" mode for it to count towards the streak
    }
}