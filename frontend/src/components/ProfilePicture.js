import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import "./../App.css";

function ProfilePicture(user) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    function onPictureClicked() {
        setDropdownVisible(!isDropdownVisible);
    }

    return(
        <div className="profile">
            <div className="profile-picture" onClick={onPictureClicked}>
                <img src={user.ProfilePicture} alt="Profile"/>
            </div>
            { isDropdownVisible && <ProfileDropdown user={user}/> }
        </div>
    );
}

export default ProfilePicture;

