import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./joblyApi";
import Nav from "./Nav";
import RoutesList from "./RoutesList";
import userContext from "./userContext";
import jwt_decode from "jwt-decode";
import "./JoblyApp.css"

/** Component for managing jobly application
 *
 * Prop: None
 *
 * State:
 *      userData = {
 *          currUserData : null || {},
 *          waitingForLoginInfo : bool
 *      }
 *
 *
 * @returns JoblyApp Component
 *
 * App -> JoblyApp -> { Nav, RoutesList }
 */
function JoblyApp() {

    const initialUserDataState = {
        currUserData: null,
        waitingForLoginInfo: true
    };

    const [userData, setUserData] = useState(initialUserDataState);

    /** Upon refresh or reload, we check user's local storage for token. If token exists,
     * user data is gotten from API and we re-set the token.
    */
    useEffect(function checkLocalStorageForToken() {
        const tokenFromLocal = JSON.parse(localStorage.getItem('token'));
        async function getUserData() {
            if (tokenFromLocal) {
                await getUserDataFromApi(tokenFromLocal);
                // setUserData({ ...userData, waitingForLoginInfo: false });
            } else {
                setUserData({ currUserData: null, waitingForLoginInfo: false });
            }
        }
        getUserData();
    }, []);

    async function getUserDataFromApi(token) {

        const payload = jwt_decode(token);
        localStorage.setItem('token', JSON.stringify(token));

        const userDataFromApi = await JoblyApi.getUserData(payload.username, token);

        setUserData({ waitingForLoginInfo: false, currUserData: userDataFromApi.user });
    }

    /** Handles user login. Gets user token from API call and sets token
     * to JoblyApi.token and sets it in state.
     */
    async function handleLogin(formData) {
        const userToken = await JoblyApi.getLoggedInUserToken(formData);
        await getUserDataFromApi(userToken);
    }

    /** Handles user registration. Gets user token from API call and sets token
    * to JoblyApi.token and sets it in state.
    */
    async function handleSignUp(formData) {
        await JoblyApi.getNewUserToken(formData);
    }

    /** Handle profile patch. Get formData
     */
    async function handleProfileEdit(formData) {
        const edit = await JoblyApi.patchUserData(formData, userData.currUserData.username);
        setUserData((currData) =>
        ({
            waitingForLoginInfo: false,
            currUserData: { ...currData.currUserData, ...edit.user }
        }));
        console.log("userData after setting --->", userData);
    }

    /** Handles user logout. Resets userData in state to initial data and
     *  resets the token.
     */
    function handleLogout() {
        setUserData({ currUserData: null, waitingForLoginInfo: false });
        JoblyApi.token = null;
        localStorage.clear();
    }

    if (userData.waitingForLoginInfo) {
        return (
            <p>Loading...</p>
        );
    }

    return (
        <div className="JoblyApp">
            <userContext.Provider value={{ currUserData: userData.currUserData }}>
                <div className="container">
                    <BrowserRouter>
                        <Nav handleLogout={handleLogout} />
                        <RoutesList
                            handleLogin={handleLogin}
                            handleSignUp={handleSignUp}
                            handleProfileEdit={handleProfileEdit} />
                    </BrowserRouter>
                </div>
            </userContext.Provider>
        </div>
    );
}


export default JoblyApp;