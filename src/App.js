import Timer from "./components/Timer";
import AppHeader from "./components/AppHeader";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <div className="Timer-background">
        <Timer/>
      </div>
    </div>
  );
}

export default App;
