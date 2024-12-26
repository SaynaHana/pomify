import { useContext, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { googleProvider } from "../utils/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ auth, children }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    /* Shows user the sign in with Google popup */
    function signIn() {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // given a google access token on success
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

                // attempt to add user to database
                user.getIdToken().then(function(token) {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    // attempt to create user on sign in
                    createUser();
                });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log("Error " + errorCode + ": " + errorMessage);
            });
    }

    async function handleSignOut() {
        try {
            await signOut(auth);
            console.log("Signed out successfully.");
        }
        catch(error) {
            console.error("Error occured on sign out: ", error);
        }
    }

    /* Tries to create user by sending request to backend API */
    function createUser() {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/user", {
        })
        .then(function (response) {
            console.log("Create user response: " + response);
        })
        .catch(function (error) {
            console.log("Create user error: " + error);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if(u) {
                setUser(u);
                setLoggedIn(true);
            } 
            else {
                setUser(null);
                setLoggedIn(false);
            }
        })
    }, []);

    return(
        <AuthContext.Provider value={{user, isLoggedIn, signIn, handleSignOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}