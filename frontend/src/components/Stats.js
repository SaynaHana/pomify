import { useState, useEffect } from "react";
import "./../App.css";
import { useAuth } from "../hooks/AuthContext";

/*
    Component for stats menu
*/
function Stats() {
    const auth = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const userData = await auth.getUserFromDb();   
            setUser(userData);
            console.log(userData);
        }

        getUser();
    }, []);


    return(
        <div>
            <div className="background">
                <h2 className="sub-header">Stats</h2>
                { auth.isLoggedIn && user != null ? 
                    <div>
                        <p>Streak: {user.streak}</p>
                        <p>Longest Streak: {user.maxStreak}</p>
                    </div>
                    :
                    <div>

                    </div>
                }
            </div>
        </div>
    );
}

export default Stats;