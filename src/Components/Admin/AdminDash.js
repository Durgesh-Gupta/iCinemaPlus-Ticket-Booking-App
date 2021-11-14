import React, {  useContext, useEffect } from "react";
import AddMovie from "./AddMovie";
import MovieContext from "../../State/MovieContext";
import { BrowserRouter as Router, Switch, Route,useHistory } from "react-router-dom";
import UserDetails from "./UserDetails";
import AddShowtime from "./AddShowtime";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./Dashboard";
import Reservations from "./Reservations";


function AdminDash() {
  const context = useContext(MovieContext);
  const { Movies, getMovies ,AdminDetails,AllDetails} = context;
  const history = useHistory();

  //Fetch All Moviews
  useEffect(() => {
    if (localStorage.getItem("Authtoken")) {
      // fetchBooking(id);
    } else {
      history.push("/AdminLogin");
    }
    //API Request For Adm9in Details
    getMovies();
    console.log("Main movies",Movies)
    AdminDetails();
  }, []);

  

  return (
    <div className="container-fluid">
        
          <div className="row">
        <Router>
          <div className="col-3">
        <AdminNavbar/>
        </div>
        <div className="col-9">
        <Switch>
          <Route exact path="/AdminDash">
            {/* <AddMovie /> */}
            <Dashboard/>
          </Route>
          <Route exact path="/user">
            <UserDetails AllDetails={AllDetails}/>
          </Route>
          <Route exact path="/movies">
            <AddMovie/>
          </Route>
          <Route exact path="/addshow">
            <AddShowtime/>
          </Route>
          <Route exact path="/reservations">
            <Reservations/>
          </Route>
          </Switch>
          </div>
          </Router>
          </div>
    
      {/* <AddMovie /> */}
     
    </div>
  );
}

export default AdminDash;
