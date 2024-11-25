import "./../App.css";

function DefaultButton({ text, onClick }) {
    return (
        <div>
            <button className="default-button" onClick={onClick}>{text}</button>
        </div>
    );
}

export default DefaultButton;