public static class DailyUserApi
{
    public static void MapDailyUserEndpoints(this WebApplication app) 
    {
        /* Gets current server date */
        app.MapGet("date", async () => {
            return DateTime.Today.ToString("d");
        });
    }
}