import ModeButton from "./ModeButton";
import "./../App.css";

function ModeSelection({ SwitchMode, modes }) {
    return(
        <div>
            <ul class="Mode-selection">
                <li>
                    <ModeButton text={"Pomodoro"} onClick={() => SwitchMode(modes.POMODORO)}/>
                </li>
                <li>
                    <ModeButton text={"Short Break"} onClick={() => SwitchMode(modes.SHORT_BREAK)}/>
                </li>
                <li>
                    <ModeButton text={"Long Break"} onClick={() => SwitchMode(modes.LONG_BREAK)}/>
                </li>
            </ul>
        </div>
    );
}

export default ModeSelection;