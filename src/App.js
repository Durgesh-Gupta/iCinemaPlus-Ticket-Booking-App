import "./App.css";

import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NowShowing from "./Components/NowShowing";
import ComingSoon from "./Components/ComingSoon";
import Cinemas from "./Components/Cinemas";
import MovieState from "./State/MovieState";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Booking from "./Components/Booking";
import UserDash from "./Components/UserDash";
import AdminDash from "./Components/Admin/AdminDash";
import AdminLogin from "./Components/Admin/AdminLogin";

function App() {
  return (
    <MovieState>
    <Router>
      <Switch>
        <Route exact path="/Admin">
          <AdminLogin />
        </Route>
        <Route exact path="/AdminDash">
          <AdminDash />
        </Route>
        <Route exact path="/">
          
              <Router>
                <NavBar />
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/NowShow">
                    <NowShowing />
                  </Route>
                  <Route exact path="/ComingSoon">
                    <ComingSoon />
                  </Route>
                  <Route exact path="/Cinemas">
                    <Cinemas />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/signup">
                    <SignUp />
                  </Route>
                  <Route exact path="/booking/:id">
                    <Booking />
                  </Route>
                  <Route exact path="/userDash">
                    <UserDash />
                  </Route>
                </Switch>
              </Router>
           
        </Route>
      </Switch>
    </Router>
          </MovieState>
  );
}

export default App;
