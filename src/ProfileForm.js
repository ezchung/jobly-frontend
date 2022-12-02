import { useState, useContext } from "react";
import userContext from "./userContext";

/**
 * Props: 
 *      handleEdit: f'n from Jobly
 * 
 * State:
 *      formData: { username, password, firstName, lastName, email }
 *      error
 * 
 * Context: 
 *      userData
 * 
 * Returns ---> if successful, Profile with ProfileForm with changes made
 *              if unsuccessful, render error component
 * 
 * Profile -> ProfileForm -> { ErrorMsg }
 */ //TODO: connect function to ProfileForm
function ProfileForm({handleEdit}) {
    const { currUserData } = useContext(userContext)
    console.log(currUserData, "<---------- in profileForm")
    const initialFormData = {
        username: currUserData.username,
        firstName: currUserData.firstName,
        lastName: currUserData.lastName,
        email: currUserData.email
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(null);

    console.log("ProfileForm State -------> ", formData);

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData((currData) => {
            currData[name] = value;
            return { ...currData };
        });
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        try{
            await handleEdit(formData);
            setError(null);
        } catch(error) {
            console.log("ERROR with profile ----> ", error);
            setError(error)
        }
    }

    return(
        <form className="ProfileForm-form" onSubmit={handleSubmit}>
            <div className="ProfileForm-div">
                <input
                    id="ProfileForm-username"
                    name="username"
                    className="form-control"
                    placeholder="Enter username..."
                    onChange={handleChange}
                    value={formData.username}
                    aria-label="UsernameInput">
                </input>
                <input
                    id="ProfileForm-firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter firstName..."
                    onChange={handleChange}
                    value={formData.firstName}
                    aria-label="firstNameInput">
                </input>
                <input
                    id="ProfileForm-lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter lastName..."
                    onChange={handleChange}
                    value={formData.lastName}
                    aria-label="lastNameInput">
                </input>
                <input
                    id="ProfileForm-email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email..."
                    onChange={handleChange}
                    value={formData.email}
                    aria-label="emailInput">
                </input>
                <button>Make Change</button>
            </div>
        </form>
    )

}


export default ProfileForm;