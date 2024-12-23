import "./../App.css";
import { PAGES } from "./../utils/Constants";
import DefaultButton from "./DefaultButton";
import LoginButton from "./Login";
import ProfilePicture from "./ProfilePicture";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";

function AppHeader({ onClick }) {
    const auth = useAuth();

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
                    { auth.isLoggedIn && auth.user !== null ? <ProfilePicture photoURL={auth.user.photoURL}/> : <LoginButton/> }
                </li>
            </ul> 
        </div>
    )
}

export default AppHeader;