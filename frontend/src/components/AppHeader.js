import "./../App.css";
import { PAGES } from "./../utils/Constants";
import DefaultButton from "./DefaultButton";
import LoginButton from "./Login";

function AppHeader({ onClick }) {
    return(
        <div className="app-header">
            <ul className="app-header-bar">
                <li>
                    <DefaultButton text="Timer" onClick={() => onClick(PAGES.TIMER)}/>
                </li>
                <li>
                    <DefaultButton text="Settings" onClick={() => onClick(PAGES.SETTINGS)}/>
                </li>
                <li>
                    <LoginButton></LoginButton>
                </li>
            </ul> 
        </div>
    )
}

export default AppHeader;