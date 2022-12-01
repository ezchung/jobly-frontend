import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import RoutesList from "./RoutesList";
import userContext from "./userContext";

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
    const initialData = {
        token : null,
        userJobs : []
    }

    const [userData, setUserData] = useState(initialData);
    
    //Function for login etc.

    return (
        <div className="JoblyApp">
            <userContext.Provider value={{token : userData.token}}>
                <div className="container">
                        <BrowserRouter>
                            < Nav />
                            <RoutesList />
                        </BrowserRouter>
                </div>
            </userContext.Provider>
        </div>
    )
}


export default JoblyApp;