import { useState, useEffect, useRef } from "react";
import TimerText from "./TimerText";
import TimerButton from "./TimerButton";
import ModeSelection from "./ModeSelection";
import "./../App.css";

/*
    Component for the timer
*/
function Timer() {
    const timer = useRef(null);
    const [timeLeft, setTimeLeft] = useState(1500);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);

    /*
        Updates the time left and calculates the minutes and seconds based on timeLeft
    */
    function UpdateTime() {
        setTimeLeft(timeLeft - 1);
        setMinutes(Math.floor(timeLeft / 60));
        setSeconds(timeLeft % 60);
    }

    /*
        Starts/resumes the timer
    */
    function StartTimer() {
        // if there is a timer already running, stop it first to prevent multiple timers
        if(timer) {
            PauseTimer();
        }

        timer.current = setInterval(() => {
            UpdateTime();
        }, 1000);
    }

    /*
        Clears the timer
    */
    function PauseTimer() {
        clearInterval(timer.current); 
    }

    useEffect(() => {
        StartTimer();
        return () => clearInterval(timer.current);
    })

    return (
        <div>
            <ModeSelection/>
            <TimerText minutes={minutes} seconds={seconds}/>
            <TimerButton text={"Start"} onClick={StartTimer}/>
            <TimerButton text={"Pause"} onClick={PauseTimer}/>
        </div>
    );
}

export default Timer;