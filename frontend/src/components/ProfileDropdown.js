import React from "react";
import "./../App.css";
import DefaultButton from "./DefaultButton";
import { useAuth } from "./../hooks/AuthContext";

function ProfileDropdown() {
    const auth = useAuth();    

    return(
        <div className="profile-dropdown">
            <DefaultButton text="Sign out" onClick={auth.handleSignOut}/>
        </div>
    );
}

export default ProfileDropdown;