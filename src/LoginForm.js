import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "./userContext";

/**
 * Props: handleLogin from JoblyApp
 *
 * State: formData { username, password } from login form
 *
 * Returns --> if logged in: companies page
 * if not logged in: renders login form
 *
 * { Nav, RoutesList } => LoginForm
 */
function LoginForm({ handleLogin }) {
    const initialFormData = {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const { currUserData } = useContext(userContext);


    /** Handles the user input of the user login form. Saves data in state */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((currData) => {
            currData[name] = value;
            return { ...currData };
        });
    }

    /** Handles submission of user login form. Calls parent function
     *  handleLogin(), passing in the form data.
    */
    async function handleSubmit(evt) {
        //TODO: try-catch (await) --> joblyAPI - what gets returned on a bad request? access and display errors?
        //errors in state?
        evt.preventDefault();

        try {
            await handleLogin(formData);
        } catch (error) {
            console.log("ERROR ---->", error);
            //add errors to state, if errors is not null
        }

    }

    //TODO: What happens if we login and the password is wrong. Displaying message.
    // if errors in state is not null, map over and display alert component (messages arr, type) (or p tag)
    return (
        <div>
            {currUserData
                ? (
                    <div>
                        <Navigate to="/companies"></Navigate>
                    </div>
                ) : (
                    <form className="LoginForm-form" onSubmit={handleSubmit}>
                        <div className="LoginForm-div">
                            <input
                                id="LoginForm-username"
                                name="username"
                                className="form-control"
                                placeholder="Enter username..."
                                onChange={handleChange}
                                value={formData.username}
                                aria-label="UsernameInput">
                            </input>
                            <input
                                id="LoginForm-password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password..."
                                onChange={handleChange}
                                value={formData.password}
                                aria-label="PasswordInput"
                                type="password">
                            </input>
                            <button className="LoginForm-btn">Submit</button>
                        </div>
                    </form>
                )
            }
        </div>

    );

}


export default LoginForm;