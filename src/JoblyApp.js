import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import RoutesList from "./RoutesList";

/** Component for managing jobly application
 *
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
            <div className="container">
                    <BrowserRouter>
                        < Nav />
                        <RoutesList />
                    </BrowserRouter>
            </div>
        </div>
    )
}


export default JoblyApp;