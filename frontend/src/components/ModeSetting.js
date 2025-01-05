import { useState } from "react";

function ModeSetting({ modeName, time }) {
    function onValueChanged(event) {
        // remove spaces
        let name = modeName.replace(/\s/g, "");
        name += "Time";

        localStorage.setItem(name, JSON.stringify(event.target.value))
    }

    return(
        <div className="setting mode-setting">
            <h3>{modeName}</h3>
            <input id="mode-input" type="number" min="1" placeholder={time} onChange={onValueChanged}></input>
        </div>
    );
}

export default ModeSetting;