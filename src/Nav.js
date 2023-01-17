import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import userContext from "./userContext";

/** Component for navigation bar
 *
 * Props: logout f'n from parent
 *
 * State: None
 *
 * Context: currUserData
 *
 * @returns Nav Component
 *
 * App -> Nav
 */
function Nav({ handleLogout }) {
  const { currUserData } = useContext(userContext);

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <NavLink
        className={
          "d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        }
        to={"/"}
      >
        <img
          className="jobly-logo bi me-2"
          src="/logo192.png"
          alt="Jobly Logo"
        />
      </NavLink>
      {currUserData ? (
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li className="nav-link px-2 link-secondary">
            <NavLink to={"/companies"}>Companies</NavLink>
          </li>

          <li className="nav-link px-2 link-secondary">
            <NavLink to={"/jobs"}>Jobs</NavLink>
          </li>

          <li className="nav-link px-2 link-secondary">
            <NavLink to={"/Profile"}>Profile</NavLink>
          </li>

          <li className="nav-link px-2 link-secondary">
            <NavLink onClick={handleLogout}>
              {`Logout ${currUserData.username}`}
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li className="nav-link px-2 link-secondary">
            <NavLink className="btn btn-success" to={"/login"}>Login</NavLink>
          </li>

          <li className="nav-link px-2 link-secondary">
            <NavLink className="btn btn-success" to={"/signup"}>Sign Up</NavLink>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Nav;
