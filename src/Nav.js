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
function Nav() {
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

    <NavLink
      className={"d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"}
      to={"/"}
    >
      <img className="jobly-logo bi me-2" src="logo192.png" alt="Jobly Logo" />
    </NavLink>

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
    </ul>
    </header>
  )
}


export default Nav;