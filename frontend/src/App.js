import { useState, useEffect, useRef } from "react";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import AppHeader from "./components/AppHeader";
import { PAGES, VISIBILITY } from "./utils/Constants";
import { loggedIn } from "./utils/Firebase";
import "./App.css";

function App() {
  const [currPage, setCurrPage] = useState(PAGES.TIMER);

  // controls the visibilities of pages
  const [visibilities, setVisibilities] = useState([true, false]);

  function switchPages(page) {
    if(currPage == page) return;

    // hide curr page and show new page
    visibilities[currPage] = false;
    visibilities[page] = true;

    setCurrPage(page);
  }

  return (
    <div className="App">
      <AppHeader onClick={switchPages}/>
      { visibilities[PAGES.TIMER] && <Timer/> }
      { visibilities[PAGES.SETTINGS] && <Settings/> }
    </div>
  );
}

export default App;
