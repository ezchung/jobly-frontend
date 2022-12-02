import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./joblyApi";
import Nav from "./Nav";
import RoutesList from "./RoutesList";
import userContext from "./userContext";

/** Component for managing jobly application
 *
 * Prop: None
 *
 * State: 
 *      initialData = {
 *          currUserData : null || {},
 *          isLoading : bool
 *      }
 *      token = null || ""
 *
 * @returns JoblyApp Component
 *
 * App -> JoblyApp -> { Nav, RoutesList }
 */
function JoblyApp() {
    const initialData = {
        //{currUserData: null (replaced with object after interaction with API, getting user data), *LoadingState: true, }
        currUserData: null,
        isLoading : false
    }

    const [token, setToken] =useState(null);

    const [userData, setUserData] = useState(initialData);

    function logout(){
        setUserData(initialData);
        JoblyApi.token = null;
    }
    //TODO: using useEffect listening for change to token. 
    //Currently only hanging on to token. *With jobs, will want to fetch
    //Function for login etc.
    //FIXME: inside of effect listening for token change, make fetch for user. if done, can move logic of line 34 and 42 into one. Can decode token and backend has username in payload
    useEffect(await JoblyApi.getUser, [token])

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
//TODO: with currentContext can change context to currUserData : userData.currUserData. Can take out token (already saved in JoblyApi) 
    return (
        <div className="JoblyApp">
            <userContext.Provider value={{token : token, username: currUserData.username}}> 
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