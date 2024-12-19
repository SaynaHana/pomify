import ModeButton from "./DefaultButton";
import "./../App.css";
import { MODES } from "./../utils/Constants";

function ModeSelection({ SwitchMode }) {
    return(
        <div>
            <ul className="Mode-selection">
                <li>
                    <ModeButton text={"Pomodoro"} onClick={() => SwitchMode(MODES.POMODORO)}/>
                </li>
                <li>
                    <ModeButton text={"Short Break"} onClick={() => SwitchMode(MODES.SHORT_BREAK)}/>
                </li>
                <li>
                    <ModeButton text={"Long Break"} onClick={() => SwitchMode(MODES.LONG_BREAK)}/>
                </li>
            </ul>
        </div>
    );
}

export default ModeSelection;