using System.ComponentModel.DataAnnotations.Schema;
using FirebaseAdmin.Auth;

namespace Pomodoro.Models 
{
    public class DailyUserData 
    {
        public int Id { get; set; } // id for indexing
        public string? Uid { get; set; } // id from authentication server
        public string? Date { get; set; }
        public int TimeSpent { get; set; } // time spent in minutes

        public DailyUserData(string uid, string date, int timeSpent) 
        {
            this.Uid = uid;
            this.Date = date;
            this.TimeSpent = timeSpent;
        }
    }
}