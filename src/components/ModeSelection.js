import ModeButton from "./ModeButton";
import "./../App.css";

function ModeSelection() {
    return(
        <div>
            <ul class="Mode-selection">
                <li>
                    <ModeButton text={"Pomodoro"}/>
                </li>
                <li>
                    <ModeButton text={"Short Break"}/>
                </li>
                <li>
                    <ModeButton text={"Long Break"}/>
                </li>
            </ul>
        </div>
    );
}

export default ModeSelection;