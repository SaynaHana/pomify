import { useState, useEffect } from "react";
import "./../App.css";

function TimerText() {
    // total time in seconds
    // initial time is 25 minutes
    const[time, setTime] = useState(1500);

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(25);

    function UpdateTime() {
        // subtract a second from time
        setTime(time => time - 1);

        // now calculate the time in minutes and remaining seconds
        setMinutes(Math.floor(time / 60))
        setSeconds(time % 60);
    }

    // start timer
    // updates every 1 second
    useEffect(() => {
        // set interval
        const interval = setInterval(() => { 
            UpdateTime() 
        }, 1000);
        
        // clear interval
        return () => clearInterval(interval);
    }, [time, seconds, minutes]);


    return(
        <div>
            <h1>{minutes + ":" + String(seconds).padStart(2, "0")}</h1>
        </div>
    )
}

export default TimerText;