import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./joblyApi";
import Nav from "./Nav";
import RoutesList from "./RoutesList";
import userContext from "./userContext";
import jwt_decode from "jwt-decode";

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
        currUserData: null,
        isLoading: true
    };

    const [token, setToken] = useState(null);

    const [userData, setUserData] = useState(initialData);

    /** Upon token change in state, gets user data from API request
     *  assigns user data to state and sets isLoading to false.
     */
    useEffect(function getUserData() {
        if (token) {
            const payload = jwt_decode(token);
            JoblyApi.token = token;
            async function getUserDataFromApi() {
                const userDataFromApi = await JoblyApi.getUserData(payload.username, token);
                setUserData({ isLoading: false, currUserData: userDataFromApi.user });
            }
            getUserDataFromApi();
        } else {
            setUserData({ currUserData: null, isLoading: true });
            JoblyApi.token = null;
        }
    }, [token]);

    /** Handles user login. Gets user token from API call and sets token
     * to JoblyApi.token and sets it in state.
     */
    async function handleLogin(formData) {
        const userToken = await JoblyApi.getLoggedInUserToken(formData);
        setToken(userToken);
    }

    /** Handles user registration. Gets user token from API call and sets token
    * to JoblyApi.token and sets it in state.
    */
    async function handleSignUp(formData) {
        const token = await JoblyApi.getNewUserToken(formData);
        setToken(token);
    }

    /** Handles user logout. Resets userData in state to initial data and
     *  resets the token.
     */ //TODO: //update token in state
    function logout() {
        setUserData(initialData);
        JoblyApi.token = null;
    }

    return (
        <div className="JoblyApp">
            <userContext.Provider value={{ currUserData: userData.currUserData }}>
                <div className="container">
                    <BrowserRouter>
                        <Nav logout={logout} />
                        <RoutesList
                            handleLogin={handleLogin}
                            handleSignUp={handleSignUp} />
                    </BrowserRouter>
                </div>
            </userContext.Provider>
        </div>
    );
}


export default JoblyApp;