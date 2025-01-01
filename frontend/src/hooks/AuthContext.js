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

    /* Tries to get the user from the backend database and then returns it */
    async function getUserFromDb() {
        let userData = null;        

        await axios.post(process.env.REACT_APP_BACKEND_URL + "/user/data", {
        }).then(function (response) {
            userData = response.data;
        }).catch(function (error) {
            console.log("Get User From Db Error: " + error);
        });

        return userData;
    }

    /* Tries to delete user from backend database and Firebase */
    async function deleteUser() {
        axios.delete(process.env.REACT_APP_BACKEND_URL + "/user", {
        }).then(function (response) {
            console.log("Delete user successful");
        }).catch(function(error) {
            console.error("Delete user error: " + error);
        });
    }

    /* Tries to update daily user data */
    async function updateDailyUserData(timeSpent) {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/daily_user", {
            TimeSpent: timeSpent 
        }).then(function (response) {
            console.log("Daily User Data Update successful.");
        }).catch(function(error) {
            console.error("Daily User Data Update: error: " + error);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if(u) {
                setUser(u);
                setLoggedIn(true);

                // set the token
                u.getIdToken().then(function(token) {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    // update streak
                    axios.post(process.env.REACT_APP_BACKEND_URL + "/streak"
                    ).then(function (response) {
                    }).catch(function (error) {
                        console.log("Log in error: " + error);
                    });
                });

            } 
            else {
                setUser(null);
                setLoggedIn(false);
            }
        })
    }, []);

    return(
        <AuthContext.Provider value={{user, isLoggedIn, signIn, handleSignOut, getUserFromDb, deleteUser, updateDailyUserData}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}