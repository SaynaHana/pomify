import "./../App.css";

function TimerButton({ text, onClick }) {
    return (
        <div>
            <button className="Timer-button" onClick={onClick}>{text}</button>
        </div>
    );
}

export default TimerButton;