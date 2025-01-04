import { useState, useEffect, useRef } from "react";
import TimerText from "./TimerText";
import TimerButton from "./TimerButton";
import ModeSelection from "./ModeSelection";
import DefaultButton from "./DefaultButton";
import "./../App.css";
import { useTimer } from "../contexts/TimerContext";

/*
    Component for the timer
*/
function Timer() {
    const timer = useTimer();

    return (
        <div>
            <div className="timer-background">
            <ModeSelection SwitchMode={timer.switchMode}/>
            <TimerText minutes={timer.minutes} seconds={timer.seconds}/>
            <div className="timer-buttons">
                <TimerButton text={timer.timerOn ? "Pause" : "Start"} onClick={() => {timer.setTimerOn(!timer.timerOn)}}/>
                <DefaultButton text="Skip" onClick={timer.onTimerEnd}/>
            </div>
            <h3 id="pomodoro-count">#{timer.pomodoroCount + 1}</h3>
            </div>
        </div>
    );
}

export default Timer;