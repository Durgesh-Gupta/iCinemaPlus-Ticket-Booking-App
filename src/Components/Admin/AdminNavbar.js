import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <Link class="nav-link" aria-current="page" to="/">
            Dashboard
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" aria-current="page" to="/user">
            Users
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/addshow">
            Add Shows
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/">
            AddU Movies
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
