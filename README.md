# Pomify

Pomify is a Pomodoro timer web app.
## Features

- Pomodoro timer
- User authentication through Google
- Time tracking
- Streaks

## Tech Stack

**Client:** React

**Server:** ASP.Net, MySQL, Firebase

## Usage
The timer page on the web app will let you start and stop the timer and select which Pomodoro mode to use.
![Pomodoro Timer Page](https://github.com/SaynaHana/pomodoro/blob/main/public/timer.png)
The stats page will show your own stats such as total time spent in Pomodoro and your streak.
![Stats Page](https://github.com/SaynaHana/pomodoro/blob/main/public/stats.png)

## Installation

    1. Create a Firebase project at https://firebase.google.com/
    2. Create a Firebase web app inside of the project and enable authentication
    3. Get a json file for the Google service account
    4. Create a .env file in /frontend and fill in the following details using the web app created in step 2:
        REACT_APP_FIREBASE_API_KEY:
        REACT_APP_FIREBASE_AUTH_DOMAIN:
        REACT_APP_PROJECT_ID:
        REACT_APP_STORAGE_BUCKET:
        REACT_APP_MESSAGING_SENDER_ID:
        REACT_APP_FIREBASE_APP_ID:
        REACT_APP_BACKEND_URL:
    REACT_APP_BACKEND_URL comes from the URL that shows when you start the backend.
    5. Setup MySQL
    6. Copy and fill in the following information into appsettings.json in /backend/Pomodoro
        {
            "ConnectionStrings": {
            "Default": "Server=;User=;Password=;Database=pomodoro_users"
            },
            "Firebase": {
            "ProjectId": ""
            },
            "AllowedOrigins": ""
        }
    7. Set the environment variable for GOOGLE_ACCOUNT_CREDENTIALS to be the location of your Google service account json file from step 3
    
        
## Run Locally

    1. Use "npm start" while in the /frontend directory
    2. Use "dotnet run" while in the /backend/Pomodoro directory

