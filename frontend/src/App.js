import "./App.css";
import { Router } from "./components/Router/Router";
import { ApiProvider } from "./context/APIcontext";

function App() {
  return (
    <div className="App">
      <ApiProvider>
        <Router />
      </ApiProvider>
    </div>
  );
}

export default App;
