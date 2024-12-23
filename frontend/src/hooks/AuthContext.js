import { useContext, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

function AuthProvider({ auth, children }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

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
        <AuthContext.Provider value={{user, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}