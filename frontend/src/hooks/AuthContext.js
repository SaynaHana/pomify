import { useContext, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { googleProvider } from "../utils/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const AuthContext = createContext();

function AuthProvider({ auth, children }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    function signIn() {
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

    async function handleSignOut() {
        try {
            await signOut(auth);
            console.log("Signed out successfully.");
        }
        catch(error) {
            console.error("Error occured on sign out: ", error);
        }
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