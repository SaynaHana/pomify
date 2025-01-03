import { useState, useEffect, useRef } from "react";
import TimerText from "./TimerText";
import TimerButton from "./TimerButton";
import ModeSelection from "./ModeSelection";
import DefaultButton from "./DefaultButton";
import "./../App.css";
import { MODES } from "./../utils/Constants";
import useSound from "use-sound";
import endSound from "../assets/audio/bell.mp3"
import { useAuth } from "./../hooks/AuthContext";

/*
    Component for the timer
*/
function Timer() {
    const [timeLeft, setTimeLeft] = useState(1500);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [currMode, setCurrMode] = useState(MODES.POMODORO);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [playSound] = useSound(endSound, { volume: 0.1 });
    const auth = useAuth();

    /*
        Calculates the minutes and seconds of time left
    */
    function calculateTime(time) {
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
    function switchMode(mode) {
        if(currMode === mode) return; 

        setCurrMode(mode);

        // stop timer
        setTimerOn(false);

        let time = 0;

        // change the time of the timer to the time of the corresponding mode
        if(mode === MODES.POMODORO) {
            time = 1500;
        }
        else if(mode === MODES.SHORT_BREAK) {
            time = 300;
        }
        else {
            time = 1800;
        }

        setTimeElapsed(0);
        setTimeLeft(time);
        calculateTime(time);

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

            // update daily user data
            // get time elapsed in minutes (rounded)
            const time = Math.round(timeElapsed / 60);
            auth.updateDailyUserData(time);
            
            // cache pomodoro count
            localStorage.setItem("pomodoroCount", JSON.stringify(pomodoroCount + 1));
        }

        switchMode(nextMode);
    }

    function onStartup() {
        const _timeLeft = JSON.parse(localStorage.getItem("timeLeft"));
        const _mode = JSON.parse(localStorage.getItem("mode"));
        const _pomodoroCount = JSON.parse(localStorage.getItem("pomodoroCount"));

        if(_timeLeft != null) {
            setTimeLeft(_timeLeft);
        }
        
        if(_mode != null) {
            switchMode(_mode);
        }

        if(_pomodoroCount != null) {
            setPomodoroCount(pomodoroCount);
        }

        calculateTime(_timeLeft);
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
                calculateTime(timeLeft - 1);
                setTimeLeft((prev) => prev - 1);

                // change name of document
                let modeName = "Long Break";

                if(currMode === MODES.POMODORO) {
                    modeName = "Pomodoro"; 
                    setTimeElapsed((prev) => prev + 1);
                }
                else if(currMode === MODES.SHORT_BREAK) {
                    modeName = "Short Break";
                }

                document.title = modeName + ": " + minutes + ":" + String(seconds).padStart(2, "0");

            }, 1000);
        }
        else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [timeLeft, timerOn, currMode]);

    return (
        <div>
            <div className="timer-background">
            <ModeSelection SwitchMode={switchMode}/>
            <TimerText minutes={minutes} seconds={seconds}/>
            <div className="timer-buttons">
                <TimerButton text={timerOn ? "Pause" : "Start"} onClick={() => {setTimerOn(!timerOn)}}/>
                <DefaultButton text="Skip" onClick={onTimerEnd}/>
            </div>
            <h3 id="pomodoro-count">#{pomodoroCount + 1}</h3>
            </div>
        </div>
    );
}

export default Timer;