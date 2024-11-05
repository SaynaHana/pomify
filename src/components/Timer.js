import { useState, useEffect } from "react";
import TimerText from "./TimerText";
import TimerButton from "./TimerButton";
import "./../App.css";

function Timer() {
    // total time in seconds
    // initial time is 25 minutes
    const[time, setTime] = useState(1500);

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(25);

    // how often to update timer
    const [delay, setDelay] = useState(1000);

    // state to store if timer should countdown
    const [isRunning, setIsRunning] = useState(true);


    function UpdateTime() {
        // subtract a second from time
        setTime(time => time - 1);

        console.log(time);

        // now calculate the time in minutes and remaining seconds
        setMinutes(Math.floor(time / 60))
        setSeconds(time % 60);
    }

    function ToggleIsRunning() {
        setIsRunning(!isRunning);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(isRunning) {
                UpdateTime();
            }
        }, delay);

        return () => clearInterval(interval);
    }, [ isRunning ]);

    return (
        <div>
            <TimerText minutes={minutes} seconds={seconds}/>
            <TimerButton onClick={ToggleIsRunning}/>
        </div>
    );
}

export default Timer;