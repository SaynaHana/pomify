import { useState, useEffect } from "react";
import "./../App.css";
import { useAuth } from "../hooks/AuthContext";
import { useTimeGraph } from "../hooks/TimeGraphContext";
import StatCard from "./StatCard";
import StatProfile from "./StatProfile";

/*
    Component for stats menu
*/
function Stats() {
    const auth = useAuth();
    const timeGraph = useTimeGraph();
    const [user, setUser] = useState(null);
    const [weeklyData, setWeeklyData] = useState(null);

    useEffect(() => {
        async function getUser() {
            const userData = await auth.getUserFromDb();   
            setUser(userData);
        }

        async function getWeeklyTimeData() {
            const weekly = await timeGraph.getWeeklyTimeData();
            setWeeklyData(weekly);
        }

        getUser();
        getWeeklyTimeData();
    }, []);


    return(
        <div>
            <div className="background">
                <h2 className="sub-header">Stats</h2>
                { auth.isLoggedIn && user != null ? 
                    <div className="stats">
                        <StatProfile user={auth.user}/>
                        <StatCard title="Streak" value={user.streak + " days"}/>
                        <StatCard title="Longest Streak" value={user.maxStreak + " days"}/>
                        <StatCard title="Total Time" value={user.timeSpent + " mins"}/>
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