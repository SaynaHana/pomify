import { useState, useEffect } from "react";
import "./../App.css";
import { useAuth } from "../hooks/AuthContext";

/*
    Component for stats menu
*/
function Stats() {
    const auth = useAuth();

    useEffect(() => {
        auth.getUserFromDb();
    }); 

    return(
        <div>
            <div className="background">
                <h2 className="sub-header">Stats</h2>
                { auth.isLoggedIn && auth.user != null ? 
                    <div>
                        <p>Streak: {auth.user.streak}</p>
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