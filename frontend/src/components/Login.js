import React from "react";
import DefaultButton from "./DefaultButton";
import { useAuth } from "./../hooks/AuthContext";

function LoginButton() {
    const auth = useAuth();

    return(
        <div className="login-button">
            <DefaultButton text="Login" onClick={auth.signIn}/>
        </div>
    );
}

export default LoginButton;