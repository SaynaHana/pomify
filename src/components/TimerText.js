import "./../App.css";

function TimerText({minutes, seconds}) {
    return(
        <div>
            <h1>{minutes + ":" + String(seconds).padStart(2, "0")}</h1>
        </div>
    );
}

export default TimerText;