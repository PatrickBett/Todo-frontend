import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-sm p-2">
      <Link className="navbar-brand">Todo Manager</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavs"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavs">
        <ul className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" id="nav-link" to="/todos">
                  All Todos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="nav-link" to="/todos/today">
                  Today
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="nav-link" to="/todos/upcoming">
                  Upcoming
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="nav-link"
                  to="/"
                  onClick={onLogout}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" id="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
