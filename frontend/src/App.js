import { useState, useEffect, useRef } from "react";
import Timer from "./components/Timer";
import Stats from "./components/Stats";
import Settings from "./components/Settings";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { PAGES, VISIBILITY } from "./utils/Constants";
import AuthProvider from "./hooks/AuthContext";
import { getAuth } from "firebase/auth";
import "./App.css";

function App() {
  const [currPage, setCurrPage] = useState(PAGES.TIMER);
  const auth = getAuth();

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
      <AuthProvider auth={auth}>
        <AppHeader onClick={switchPages}/>
        { visibilities[PAGES.TIMER] && <Timer/> }
        { visibilities[PAGES.STATS] && <Stats/>}
        { visibilities[PAGES.SETTINGS] && <Settings/> }
        { visibilities[PAGES.PRIVACY] && <PrivacyPolicy/>}
        <AppFooter onClick={switchPages}/>
      </AuthProvider>
    </div>
  );
}

export default App;
