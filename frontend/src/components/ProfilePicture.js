import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import "./../App.css";

function ProfilePicture({ photoURL }) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    function onPictureClicked() {
        setDropdownVisible(!isDropdownVisible);
    }

    return(
        <div className="profile">
            <div className="profile-picture" onClick={onPictureClicked}>
                <img src={photoURL} alt="Profile"/>
            </div>
            { isDropdownVisible && <ProfileDropdown/> }
        </div>
    );
}

export default ProfilePicture;

