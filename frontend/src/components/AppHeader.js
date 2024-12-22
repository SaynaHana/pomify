import "./../App.css";
import { PAGES } from "./../utils/Constants";
import DefaultButton from "./DefaultButton";
import LoginButton from "./Login";
import ProfilePicture from "./ProfilePicture";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

function AppHeader({ onClick }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // on start, check if user is signed in
    useEffect(() => {
        const auth = getAuth();
        // u is user
        onAuthStateChanged(auth, (u) => {
            if(u) {
                setUser(u);
                setLoggedIn(true);
            }
            else {
                setUser(null);
                setLoggedIn(false);
            }
        });
    }, []);

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
                    { loggedIn ? <ProfilePicture photoURL={user.photoURL}/> : <LoginButton/> }
                </li>
            </ul> 
        </div>
    )
}

export default AppHeader;