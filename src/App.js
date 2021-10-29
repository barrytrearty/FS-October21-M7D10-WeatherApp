import "./App.css";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={SignIn} />
        <Route path="/main" exact component={Main} />
      </div>
    </Router>
  );
}

export default App;
