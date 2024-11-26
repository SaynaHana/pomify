import "./../App.css";
import DefaultButton from "./DefaultButton";

function AppHeader() {
    return(
        <div className="app-header">
            <ul className="app-header-bar">
                <li>
                    <DefaultButton text="Timer"/>
                </li>
                <li>
                    <DefaultButton text="Settings"/>
                </li>
            </ul> 
        </div>
    )
}

export default AppHeader;