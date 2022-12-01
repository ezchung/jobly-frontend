import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./joblyApi";
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
        userJobs : [],
        username: ""
    }

    const [userData, setUserData] = useState(initialData);

    function logout(){
        setUserData(initialData);
    }
    
    //Function for login etc.
    async function handleLogin(formData){
        const { username } = formData;
        const token = await JoblyApi.getLoggedInUserToken(formData);
        console.log(userData, "<--------------------- userData after login")
        setUserData((user) => ({token:token, username:username,...userData }));
    }

    return (
        <div className="JoblyApp">
            <userContext.Provider value={{token : userData.token}}>
                <div className="container">
                        <BrowserRouter>
                            <Nav logout={logout}/>
                            <RoutesList handleLogin={handleLogin}/>
                        </BrowserRouter>
                </div>
            </userContext.Provider>
        </div>
    )
}


export default JoblyApp;