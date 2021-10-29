import "./App.css";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NowShowing from "./Components/NowShowing"
import ComingSoon from "./Components/ComingSoon"
import Cinemas from "./Components/Cinemas"

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/NowShow">
            <NowShowing/>
          </Route>
          <Route exact path="/ComingSoon">
            <ComingSoon />
          </Route>
          <Route exact path="/Cinemas">
            <Cinemas />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
