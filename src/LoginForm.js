import { useState, useContext} from "react";
import { Navigate } from "react-router-dom";
import userContext from "./userContext";
import "./LoginForm.css";

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

    const initialFormCheck = {
        error : null,
        isLoading : null
    }

    const [formData, setFormData] = useState(initialFormData);
    const [formErrorAndLoad, setFormErrorAndLoad] = useState(initialFormCheck);

    const { currUserData } = useContext(userContext);

    // original plan was to useEffect for change but formData is constantly changing and error message would show in the beginning
    //This can be part of search function. While searching, utilize useEffect to check and show wanted companies that align with search

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
        //: try-catch (await) --> joblyAPI - what gets returned on a bad request? access and display errors?
        //errors in state?
        evt.preventDefault();
        console.log("Got into Login handleSubmit ")
        setFormErrorAndLoad({...formErrorAndLoad, isLoading:true});
        try {
            await handleLogin(formData);
            setFormErrorAndLoad({isLoading: false, error: null});
        } catch (error) {
            console.log("ERROR Login form ---->", error);
            //add errors to state, if errors is not null
            setFormErrorAndLoad({isLoading: false, error: error});
        }


    }

    //FIXME: if errors in state is not null, map over and display alert component (messages arr, type) (or p tag)
    return (
        <div>
            {currUserData
                ? (
                    <div>
                        <Navigate to="/companies"></Navigate>
                    </div>
                ) : (
                    
                    <form className="LoginForm-form" onSubmit={handleSubmit}>
                        <h1>Log In</h1>
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
                            {formErrorAndLoad.isLoading
                                ? <p>Loading...</p>
                                : console.log(formErrorAndLoad, "is already loaded")
                            }
                            {formErrorAndLoad.error && (formErrorAndLoad.isLoading === false)
                                ? formErrorAndLoad.error.map((e,idx) =>
                                    <p key={idx}>{e}</p>
                                    )
                                : console.log(formErrorAndLoad, "error does not exist")
                            }
                            <button className="LoginForm-btn">Submit</button>
                        </div>
                    </form>
                )
            }
        </div>

    );

}


export default LoginForm;