import "./../App.css";

function ModeButton({ text, onClick }) {
    return (
        <div>
            <button className="Mode-button" onClick={onClick}>{text}</button>
        </div>
    );
}

export default ModeButton;