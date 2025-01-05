import { useState, useEffect } from "react";
import DefaultButton from "./DefaultButton";
import { useAuth } from "./../contexts/AuthContext";
import "./../App.css";
import DeleteButton from "./DeleteButton";
import ModeSetting from "./ModeSetting";

/*
    Component for settings menu
*/
function Settings() {
    const auth = useAuth();
    
    // default times
    const [pomodoroTime, setPomodoro] = useState(25);
    const [shortBreakTime, setShortBreak] = useState(5);
    const [longBreakTime, setLongBreak] = useState(30);

    function onTimeChange(name, time) {
        localStorage.setItem(name, JSON.stringify(time)); 

        if(name == "PomodoroTime") {
            setPomodoro(time);
        }
        else if(name == "ShortBreakTime") {
            setShortBreak(time);
        }
        else if(name == "LongBreakTime") {
            setLongBreak(time);
        }
    }

    // get default times
    useEffect(() => {
        const pomodoro = localStorage.getItem("PomodoroTime");
        const shortBreak = localStorage.getItem("ShortBreakTime");
        const longBreak = localStorage.getItem("LongBreakTime");

        if(pomodoro != null) {
            setPomodoro(JSON.parse(pomodoro));
        }
        if(shortBreak != null) {
            setShortBreak(JSON.parse(shortBreak));
        }
        if(longBreak != null) {
            setLongBreak(JSON.parse(longBreak));
        }
    }, []);

    return(
        <div>
            <div className="background">
                <h2 className="sub-header">Settings</h2>
                <div className="settings">
                    <ModeSetting modeName="Pomodoro" time={pomodoroTime}/>
                    <ModeSetting modeName="Short Break" time={shortBreakTime}/>
                    <ModeSetting modeName="Long Break" time={longBreakTime}/>
                    <DeleteButton></DeleteButton>
                </div>
            </div>
        </div>
    );
}

export default Settings;