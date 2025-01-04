import { useState, useEffect } from "react";
import "./../App.css";
import { useAuth } from "../hooks/AuthContext";
import StatCard from "./StatCard";
import StatProfile from "./StatProfile";
import TimeChart from "./TimeChart";

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
        }

        getUser();
    }, []);


    return(
        <div>
            <div className="background">
                <h2 className="sub-header">Stats</h2>
                { auth.isLoggedIn && user != null ? 
                    <div className="stats">
                        <div className="stats-cards">
                            <StatProfile user={auth.user}/>
                            <StatCard title="Streak" value={user.streak + " days"}/>
                            <StatCard title="Longest Streak" value={user.maxStreak + " days"}/>
                            <StatCard title="Total Time" value={user.timeSpent + " mins"}/>
                        </div>
                        <div className="stats-time-chart">
                            <TimeChart/>
                        </div>
                    </div>
                    :
                    <div>
                        <p>Error loading stats</p>                        
                    </div>
                }
            </div>
        </div>
    );
}

export default Stats;