import { useContext, createContext } from "react";
import axios from "axios";

const TimeGraphContext = createContext();

function TimeGraphProvider({ children }) {
    async function getWeeklyTimeData() {
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

        const response = axios.post(process.env.REACT_APP_BACKEND_URL + "/daily_user/week/" + wkStartString + "/" + wkEndString, {
        }).then(function (response) {
            console.log("Get Weekly Time Data Successful.");
            return getGraphData(response.data)
        }).catch(function (error) {
            console.log("Get Weekly Time Data Error: " + error);
            return null;
        })

        return response;
    }

    function getGraphData(data) {
        if(data == null) return null;        

        // get the times
        const times = [];        

        for(let i = 0; i < data.length; i++) {
            times.push(data[i].timeSpent);
        }

        // set up label
        const labels = [];

        for(let i = 0; i < data.length; i++) {
            labels.push(data[i].date);
        }

        const graphData = {
            labels: labels,
            datasets: [{
                label: "Minutes",
                data: times,
                backgroundColor: "rgba(220, 184, 255, 0.4)",
                borderColor: "rgba(220, 184, 255, 0.8)",
                borderWidth: 1
            }]
        };

        return graphData;
    }

    async function getGraphConfig() {
        const graphData = await getWeeklyTimeData();

        const config = {
            type: "bar",
            data: graphData,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: "white"
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: "white"
                        }
                    },
                    y: {
                        ticks: {
                            color: "white"
                        },
                        beginAtZero: true
                    }
                }
            }
        };

        return config;
    }

    return(
        <TimeGraphContext.Provider value={{getGraphConfig}}>
            {children}
        </TimeGraphContext.Provider>
    );
}

export default TimeGraphProvider;

export function useTimeGraph() {
    return useContext(TimeGraphContext);
}