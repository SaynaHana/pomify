import "./../App.css";

function TimerButton({ onClick }) {
    return (
        <div>
            <button className="Timer-button" onClick={onClick}>Start</button>
        </div>
    );
}

export default TimerButton;