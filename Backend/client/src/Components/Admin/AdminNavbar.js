import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const AdminNavbar = () => {
  const history=useHistory()
  //LogOut
  const handleLogout = () => {
    localStorage.removeItem("Authtoken");
    history.push("/Admin");
  };
  return (
    <div>
      <ul className="nav flex-column bg-dark">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/AdminDash">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/movies">
           Movies
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/user">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/addshow">
             ShowTime
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reservations">
             Reservation
          </Link>
        </li>
        <li className="nav-item">
          <span className="nav-link" onClick={handleLogout}>
LogOut          </span>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
