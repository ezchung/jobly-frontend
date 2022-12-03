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
 *      userData = {
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

    //TODO: needs better name - initialUserDataState
    const initialData = {
        currUserData: null,
        isLoading: true
    };

    const [userData, setUserData] = useState(initialData);
    console.log("JoblyApp userData state ---> ", userData);

    /** Upon refresh or reload, we check user's local storage for token. If token exists,
     * user data is gotten from API and we re-set the token.
    */
    useEffect(function checkLocalStorageForToken() {
        const tokenFromLocal = JSON.parse(localStorage.getItem('token'));
        async function getUserData() {
            if (tokenFromLocal) {
                await getUserDataFromApi(tokenFromLocal);
            } else {
                setUserData({ currUserData: null, isLoading: false });
            }
        }
        getUserData();
    }, []);

    //TODO: isLoading --> waitingForLoginInfo

    /** Upon token change in state, gets user data from API request
     *  assigns user data to state and sets isLoading to false.
     */
    // useEffect(function getUserData() {
    //     if (token) {

    //         getUserDataFromApi(token);
    //     } else {
    //         setUserData({ currUserData: null, isLoading: true });
    //         JoblyApi.token = null;
    //     }
    // }, [token]);

    async function getUserDataFromApi(token) {
        const payload = jwt_decode(token);
        JoblyApi.token = token;  //TODO: Move to JoblyApi
        localStorage.setItem('token', JSON.stringify(token));
        const userDataFromApi = await JoblyApi.getUserData(payload.username);
        setUserData({ isLoading: false, currUserData: userDataFromApi.user });
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
        const updatedUserData = { ...userData.currUserData, ...edit.user };
        setUserData({ ...userData, currUserData: updatedUserData });
    } //TODO: figure out callback pattern for setters //just make isLoading: false

    /** Handles user logout. Resets userData in state to initial data and
     *  resets the token.
     */
    function logout() {  //TODO: Change to handleLogout
        setUserData({ currUserData: null, isLoading: false });
        JoblyApi.token = null;
        // setToken(null);
        localStorage.clear();
        // setLoggedIn(false);
    }

    if (userData.isLoading) {
        return (
            <p>Loading...</p>
        );
    }

    return (
        <div className="JoblyApp">
            <userContext.Provider value={{ currUserData: userData.currUserData }}>
                <div className="container">
                    <BrowserRouter>
                        <Nav logout={logout} />
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