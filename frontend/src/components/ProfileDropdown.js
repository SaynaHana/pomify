import React from "react";
import { getAuth, signOut } from "firebase/auth";
import "./../App.css";
import DefaultButton from "./DefaultButton";

function ProfileDropdown() {
    async function handleSignOut() {
        const auth = getAuth();
        try {
            await signOut(auth);
            console.log("Signed out successfully.");
        }
        catch(error) {
            console.error("Error occured on sign out: ", error);
        }
    }

    return(
        <div className="profile-dropdown">
            <DefaultButton text="Sign out" onClick={handleSignOut}/>
        </div>
    );
}

export default ProfileDropdown;