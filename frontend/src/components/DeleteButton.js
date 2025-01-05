import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import DefaultButton from "./DefaultButton";

function DeleteButton() {
    const auth = useAuth();    
    const [showDialog, setDialog] = useState(false);

    return(
        <div>
            <button className="default-button delete-button" onClick={() => setDialog(true)}>Delete Account</button>
            { showDialog && 
                (<div>
                    <p>Are you sure you want to delete your account? If you delete your account, ALL of your data will be PERMANENTLY deleted!</p>
                    <DefaultButton text="Yes" onClick={() => auth.deleteUser()}/>
                    <DefaultButton text="No" onClick={() => setDialog(false)}/>
                </div>)
            }
        </div>
    )
}

export default DeleteButton;