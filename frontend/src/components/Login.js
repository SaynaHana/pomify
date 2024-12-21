import React from "react";
import DefaultButton from "./DefaultButton";
import { auth, googleProvider } from "../utils/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function LoginButton() {
    function googleSignIn() {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // given a google access token on success
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log("Error " + errorCode + ": " + errorMessage);
            });
    }

    return(
        <div className="login-button">
            <DefaultButton text="Login" onClick={googleSignIn}/>
        </div>
    );
}

export default LoginButton;