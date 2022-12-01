import { useState } from "react";

/**
 * TODO: Edit LoginIn Form variable names
 */
function LoginForm({handleLogin}) {
    const initialFormData = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialFormData);

    console.log("Login Form State -------> ", formData);

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


export default LoginForm;