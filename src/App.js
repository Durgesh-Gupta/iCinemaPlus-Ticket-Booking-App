import "./App.css";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NowShowing from "./Components/NowShowing"
import ComingSoon from "./Components/ComingSoon"
import Cinemas from "./Components/Cinemas"
import MovieState from "./State/MovieState";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import UserState from "./State/UserState";
import Booking from "./Components/Booking";

function App() {
  return (
    <MovieState>
    <UserState>
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
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
          <Route exact path="/booking/:id">
            <Booking/>
          </Route>
        </Switch>
      </Router>
    </UserState>
    </MovieState>
  );
}

export default App;
