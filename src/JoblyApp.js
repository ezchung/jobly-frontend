import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import RoutesList from "./RoutesList";

/**
 * Prop: None
 * 
 * State: None
 * 
 * @returns JoblyApp Component
 * 
 * App -> JoblyApp -> { Nav, RoutesList }
 */
function JoblyApp() {
    return (
        <div className="JoblyApp">
            <BrowserRouter>
                < Nav />
                <RoutesList />
            </BrowserRouter>
        </div>
    )
}


export default JoblyApp;