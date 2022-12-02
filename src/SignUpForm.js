import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import userContext from "./userContext";

/**
 * Props: handleSignUp from JoblyApp
 *
 * State: formData: { username, password, firstName, lastName, email }
 *
 * Returns --> if successful: companies page
 * if unsuccessful: re-render SignUpForm
 *
 * { Nav, RoutesList } => SignUpForm
 */
function SignUpForm({ handleSignUp }) {
    //TODO: Add error state and check if sign up form is valid
    const initialFormData = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const initialFormCheck = {
        error : null,
        isLoading : null
    }

    const [formData, setFormData] = useState(initialFormData);
    const [formErrorAndLoad, setFormErrorAndLoad] = useState(initialFormCheck);

    const { currUserData } = useContext(userContext);

    /** Handles the user input of the user registration form. Saves data in state */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((currData) => {
            currData[name] = value;
            return { ...currData };
        });
    }


    /** Handles submission of user registration form. Calls parent function
     *  handleSignUp(), passing in the form data.
     */
    async function handleSubmit(evt) {
        evt.preventDefault();
        setFormErrorAndLoad({...formErrorAndLoad, isLoading:true});
        try{
            await handleSignUp(formData);
            setFormErrorAndLoad({isLoading: false, error: null});
        }catch (error) {
            console.log("ERROR Signup form---->", error);
            setFormErrorAndLoad({isLoading: false, error: error});
        }
    }

    return (
        <div>
            {currUserData
                ? (
                    <div>
                        <Navigate to="/companies"></Navigate>
                    </div>
                ) : (
                    <div className="SignUpForm" onSubmit={handleSubmit}>
                        <form className="SignUpForm-form">
                            <input
                                id="SignUpForm-username"
                                name="username"
                                className="form-control"
                                placeholder="Enter username..."
                                onChange={handleChange}
                                value={formData.username}
                                aria-label="UsernameInput">
                            </input>
                            <input
                                id="SignUpForm-password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password..."
                                onChange={handleChange}
                                value={formData.password}
                                aria-label="passwordInput">
                            </input>
                            <input
                                id="SignUpForm-firstName"
                                name="firstName"
                                className="form-control"
                                placeholder="Enter firstName..."
                                onChange={handleChange}
                                value={formData.firstName}
                                aria-label="firstNameInput">
                            </input>
                            <input
                                id="SignUpForm-lastName"
                                name="lastName"
                                className="form-control"
                                placeholder="Enter lastName..."
                                onChange={handleChange}
                                value={formData.lastName}
                                aria-label="lastNameInput">
                            </input>
                            <input
                                id="SignUpForm-email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email..."
                                onChange={handleChange}
                                value={formData.email}
                                aria-label="emailInput">
                            </input>
                            {formErrorAndLoad.isLoading
                                ? <p>Loading...</p> 
                                : null
                            }
                            {formErrorAndLoad.error && (formErrorAndLoad.isLoading === false)
                                ? formErrorAndLoad.error.map((e,idx) =>
                                    <p key={idx}>{e}</p>
                                    )
                                : null
                            }
                            <button className="SignUpForm-btn btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                )

            }
        </div>
    );


}


export default SignUpForm;