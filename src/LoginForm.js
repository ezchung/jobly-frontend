import { useState, useContext } from "react";
import { Navigate } from "react-router-dom"
import userContext from "./userContext";

/**
 * Props: handleLogin from JoblyApp
 *
 * State: formData { username, password } from login form
 *
 * Returns --> if logged in: companies page
 * if not logged in: renders login form
 *
 * 
 */
function LoginForm({handleLogin}) {
    const initialFormData = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialFormData);

    const { token } = useContext(userContext);

    function handleChange(evt){
        const {name, value} = evt.target
        setFormData((currData) => {
            currData[name] = value;
            return {...currData};
        });
    }

    function handleSubmit(evt){
        evt.preventDefault();
        handleLogin(formData);
    }

    return (
        <div>
            {token
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

    )

}


export default LoginForm;