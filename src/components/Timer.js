import { useState, useEffect, useRef } from "react";
import TimerText from "./TimerText";
import TimerButton from "./TimerButton";
import ModeSelection from "./ModeSelection";
import "./../App.css";

/*
    Component for the timer
*/
function Timer() {
    const [timeLeft, setTimeLeft] = useState(1500);
    const [timerOn, setTimerOn] = useState(false);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);

    /*
        Updates time left and calculates the minutes and seconds
    */
    function UpdateTime() {
        setTimeLeft((prev) => prev - 1);
        setMinutes(Math.floor(timeLeft/60));
        setSeconds(timeLeft % 60);

        // stops timer after complete
        if(timeLeft <= 0) {
            setTimerOn(false);
        }
    }

    useEffect(() => {
        let timer = null;

        // create interval when timer is running
        if(timerOn) {
            timer = setInterval(() => {
                UpdateTime();
            }, 1000);
        }
        else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [timeLeft, timerOn]);

    return (
        <div>
            <TimerText minutes={minutes} seconds={seconds}/>
            <TimerButton text={timerOn ? "Pause" : "Start"} onClick={() => {setTimerOn(!timerOn)}}/>
        </div>
    );
}

export default Timer;