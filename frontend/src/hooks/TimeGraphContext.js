import { useContext, createContext } from "react";
import axios from "axios";

const TimeGraphContext = createContext();

function TimeGraphProvider({ children }) {
    function getWeeklyTimeData() {
        // get the formatted strings for the start and end of the week
        const wkEnd = new Date();
        const wkEndDD = String(wkEnd.getDate()).padStart(2, "0");
        const wkEndMM = String(wkEnd.getMonth() + 1).padStart(2, "0");
        const wkEndYYYY = wkEnd.getFullYear();
        const wkEndString = wkEndYYYY + "." + wkEndMM + "." + wkEndDD;

        const wkStart = new Date();
        wkStart.setDate(wkStart.getDate() - 6);
        const wkStartDD = String(wkStart.getDate()).padStart(2, "0");
        const wkStartMM = String(wkStart.getMonth() + 1).padStart(2, "0");
        const wkStartYYYY = wkStart.getFullYear();
        const wkStartString = wkStartYYYY + "." + wkStartMM + "." + wkStartDD;

        axios.post(process.env.REACT_APP_BACKEND_URL + "/daily_user/week/" + wkStartString + "/" + wkEndString, {
        }).then(function (response) {
            console.log("Get Weekly Time Data Successful.");
            return response.data;
        }).catch(function (error) {
            console.log("Get Weekly Time Data Error: " + error);
        })
    }

    return(
        <TimeGraphContext.Provider value={{getWeeklyTimeData}}>
            {children}
        </TimeGraphContext.Provider>
    );
}

export default TimeGraphProvider;

export function useTimeGraph() {
    return useContext(TimeGraphContext);
}