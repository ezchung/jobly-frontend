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
        JoblyApi.token = token;

        setUserData({...userData, token:token, username:username });
    }

    async function handleSignUp(formData){
        const token = await JoblyApi.getNewUserToken(formData);
        const { username } = formData;
        setUserData({...userData, token: token, username: username})
        JoblyApi.token = token;
    }

    return (
        <div className="JoblyApp">
            <userContext.Provider value={{token : userData.token, username: userData.username}}>
                <div className="container">
                        <BrowserRouter>
                            <Nav logout={logout}/>
                            <RoutesList
                                handleLogin={handleLogin}
                                handleSignUp={handleSignUp}/>
                        </BrowserRouter>
                </div>
            </userContext.Provider>
        </div>
    )
}


export default JoblyApp;