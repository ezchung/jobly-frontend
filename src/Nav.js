import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

/**
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
    <div className="Nav row">
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "nav active" : undefined)}
            to={"/"}
          >
            <h2>Jobly</h2>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "nav active" : undefined)}
            to={"/companies"}
          >
            <h2>Companies</h2>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "nav active" : undefined)}
            to={"/jobs"}
          >
            <h2>Jobs</h2>
          </NavLink>
        </li>
      </ul>

    </div>
  )
}


export default Nav;