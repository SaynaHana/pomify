import { useAuth } from "../contexts/AuthContext";

function DeleteButton() {
    const auth = useAuth();    

    return(
        <div>
            <button className="default-button delete-button" onClick={auth.deleteUser}>Delete Account</button>
        </div>
    )
}

export default DeleteButton;