import { useState, useEffect, useRef } from "react";
import TimerText from "./TimerText";
import TimerButton from "./TimerButton";
import ModeSelection from "./ModeSelection";
import "./../App.css";
import { MODES } from "./../utils/Constants";
import useSound from "use-sound";
import endSound from "../assets/audio/bell.mp3"

/*
    Component for the timer
*/
function Timer() {
    const [timeLeft, setTimeLeft] = useState(1500);
    const [timerOn, setTimerOn] = useState(false);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [currMode, setCurrMode] = useState(MODES.POMODORO);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [playSound] = useSound(endSound, { volume: 0.1 });

    /*
        Calculates the minutes and seconds of time left
    */
    function CalculateTime(time) {
        setMinutes(Math.floor(time/60));
        setSeconds(time % 60);

        // stops timer after complete
        if(time <= 0) {
            onTimerEnd();
        }

        // cache time
        localStorage.setItem("timeLeft", JSON.stringify(time));
    }

    /*
        Changes the time to the time of a corresponding mode
    */
    function SwitchMode(mode) {
        if(currMode === mode) return; 

        setCurrMode(mode);

        // stop timer
        setTimerOn(false);

        let time = 0;

        // change the time of the timer to the time of the corresponding mode
        if(mode === MODES.POMODORO) {
            time = 5;
        }
        else if(mode === MODES.SHORT_BREAK) {
            time = 300;
        }
        else {
            time = 1800;
        }

        setTimeLeft(time);
        CalculateTime(time);

        // cache mode 
        localStorage.setItem("mode", JSON.stringify(mode));
    }

    /*
        Notifies the user that time is up and switches the mode
    */
    function onTimerEnd() {
        // stop timer
        setTimerOn(false);

        playSound();

        let nextMode = MODES.POMODORO;

        // if pomodoro just finished, increment pomodoroCount
        if(currMode === MODES.POMODORO) {
            // if pomodoroCount + 1 is a multiple of 4, then take long break
            // otherwise, short break
            if((pomodoroCount + 1) % 4 === 0) {
                nextMode = MODES.LONG_BREAK;
            }
            else {
                nextMode = MODES.SHORT_BREAK;
            }

            setPomodoroCount((prev) => prev + 1);
            
            // cache pomodoro count
            localStorage.setItem("pomodoroCount", JSON.stringify(pomodoroCount + 1));
        }

        SwitchMode(nextMode);
    }

    function onStartup() {
        const _timeLeft = JSON.parse(localStorage.getItem("timeLeft"));
        const _mode = JSON.parse(localStorage.getItem("mode"));
        const _pomodoroCount = JSON.parse(localStorage.getItem("pomodoroCount"));

        console.log("Time Left: " + _timeLeft);
        console.log("Mode: " + _mode);
        console.log("Pomodoro Count: " + _pomodoroCount);

        if(_timeLeft != null) {
            setTimeLeft(_timeLeft);
        }
        
        if(_mode != null) {
            SwitchMode(_mode);
        }

        if(_pomodoroCount != null) {
            setPomodoroCount(pomodoroCount);
        }

        CalculateTime(_timeLeft);
    }

    // initialize data from local storage
    useEffect(() => {
       onStartup();
    }, []);

    useEffect(() => {
        let timer = null;

        // create interval when timer is running
        if(timerOn) {
            timer = setInterval(() => {
                CalculateTime(timeLeft - 1);
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [timeLeft, timerOn, currMode]);

    return (
        <div>
            <ModeSelection SwitchMode={SwitchMode}/>
            <TimerText minutes={minutes} seconds={seconds}/>
            <TimerButton text={timerOn ? "Pause" : "Start"} onClick={() => {setTimerOn(!timerOn)}}/>
            <h3 id="pomodoro-count">#{pomodoroCount + 1}</h3>
        </div>
    );
}

export default Timer;