import { useState, useEffect } from "react";
import { Chart as ChartJS, Tooltip, Legend, Title, LinearScale, CategoryScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTimeGraph } from "../contexts/TimeGraphContext";

function TimeChart() {
    const timeGraph = useTimeGraph();
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);

    ChartJS.register(Tooltip, Legend, Title, LinearScale, CategoryScale, BarElement)

    useEffect(() => {
        async function getConfig() {
            const config = await timeGraph.getGraphConfig();

            if(config != null) {
                setData(config.data); 
                setOptions(config.options);
            }
            else {
                console.error("Get Graph Config error");
            }
        }

        getConfig();
    }, []);

    return(
        <div>
            { data != null && options != null && <Bar data={data} options={options}/>}
        </div>
    );
}

export default TimeChart;