import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

/** Component for navigation bar
 *
 * Props: None
 *
 * State: None
 *
 * @returns Nav Component
 *
 * App -> Nav
 */
function Nav({ isLoggedIn }) {
  //TODO: get username to put next to logout

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

    <NavLink
      className={"d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"}
      to={"/"}
    >
      <img className="jobly-logo bi me-2" src="/logo192.png" alt="Jobly Logo" />
    </NavLink>
    {isLoggedIn 
      ? (
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" >
            <li className="nav-link px-2 link-secondary">
              <NavLink
                className={({ isActive }) => (isActive ? "nav active" : undefined)}
                to={"/companies"}
              >Companies
              </NavLink>
            </li>

            <li className="nav-link px-2 link-secondary">
              <NavLink
                className={({ isActive }) => (isActive ? "nav active" : undefined)}
                to={"/jobs"}
              >Jobs
              </NavLink>
            </li>

            <li className="nav-link px-2 link-secondary">
              <NavLink
                className={({ isActive }) => (isActive ? "nav active" : undefined)}
                to={"/Profile"}
              >Profile
              </NavLink>
            </li>

            <li className="nav-link px-2 link-secondary">
              <NavLink
                className={({ isActive }) => (isActive ? "nav active" : undefined)}
                to={"/logout"}
              >Logout NAME_OF_USER
              </NavLink>
            </li>
          </ul>
        )
      : (
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" >
          <li className="nav-link px-2 link-secondary">
            <NavLink
              className={({ isActive }) => (isActive ? "nav active" : undefined)}
              to={"/login"}
            >Login
            </NavLink>
          </li>

          <li className="nav-link px-2 link-secondary">
            <NavLink
              className={({ isActive }) => (isActive ? "nav active" : undefined)}
              to={"/signup"}
            >Sign Up
            </NavLink>
          </li>
        </ul>
      )
    }
    </header>
  )
}


export default Nav;