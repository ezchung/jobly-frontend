import { useContext, useState } from "react";
import { Navigate } from "react-router-dom"
import userContext from "./userContext";

/**
 * Props: handleSignUp from JoblyApp
 *
 * State: formData: { username, password, firstName, lastName, email }
 *
 * Returns --> if successful: companies page
 * if unsuccessful: re-render SignUpForm
 *
 */
function SignUpForm({handleSignUp}) {

    const initialFormData = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }

    const [formData, setFormData ] = useState(initialFormData);

    const { token } = useContext(userContext);

    function handleChange(evt){
        const {name, value} = evt.target;

        setFormData((currData) => {
            currData[name] = value;
            return {...currData};
        });
    }



    function handleSubmit(evt){
        evt.preventDefault();
        console.log("formData in handleSubmit---> ", formData)
        handleSignUp(formData);
    }
    console.log("formData after handleSubmit---> ", formData)

    return (
        <div>
            {token
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
                            <button className="SignUpForm-btn btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                )

            }
        </div>
    )


}


export default SignUpForm;