import React from "react";
import { NavLink } from "react-router-dom";

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
    <div>
      <h1>Nav goes here</h1>
      <NavLink 
        className={({ isActive }) => (isActive ? "nav active" : undefined)}
        to={"/"}
      >
        <h2>Jobly</h2>
      </NavLink> 
      <NavLink 
        className={({ isActive }) => (isActive ? "nav active" : undefined)}
        to={"/companies"}
      >
        <h2>Companies</h2>
      </NavLink> 
      <NavLink 
        className={({ isActive }) => (isActive ? "nav active" : undefined)}
        to={"/jobs"}
      >
        <h2>Jobs</h2>
      </NavLink> 
    </div>
  )
}


export default Nav;