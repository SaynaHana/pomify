import "./../App.css";
import DefaultButton from "./DefaultButton";
import { PAGES } from "../utils/Constants";

function AppFooter({ onClick }) {
    return(
        <div className="app-footer">
            <DefaultButton text="Privacy" onClick={() => onClick(PAGES.PRIVACY)}/>
        </div>
    );
}

export default AppFooter;