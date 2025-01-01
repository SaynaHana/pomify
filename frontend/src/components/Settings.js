import { useState, useEffect } from "react";
import DefaultButton from "./DefaultButton";
import { useAuth } from "./../hooks/AuthContext";
import "./../App.css";

/*
    Component for settings menu
*/
function Settings() {
    const auth = useAuth();

    return(
        <div>
            <div className="background">
                <h2 className="sub-header">Settings</h2>
                <DefaultButton onClick={auth.deleteUser} text="Delete account"/>
            </div>
        </div>
    );
}

export default Settings;