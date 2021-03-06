import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import MovieContext from "../State/MovieContext";
function NavBar() {
  let history = useHistory();
  const context = useContext(MovieContext);
  const { getMovies } = context;
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  //  Fetch All Moviews
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid d-flex jsutify-content-center">
        <Link className="navbar-brand" to="/">
          <strong>iCinema</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* style={{marginLeft:"30%"}} */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/NowShow">
                Now Showing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ComingSoon">
                Coming Soon
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cinemas">
                Cinemas
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                SignUp
              </Link>
            </form>
          ) : (
            <form form className="d-flex">
              <Link className="btn mx-2" to="/userDash" role="button">
                <i className="bi bi-person-circle text-light"></i>{" "}
              </Link>
              <Link
                onClick={handleLogout}
                className="btn btn-primary mx-2"
                to="/login"
                role="button"
              >
                Logout
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
