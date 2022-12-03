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
 */
function ProfileForm({ handleProfileEdit }) {
    const { currUserData } = useContext(userContext);
    // console.log(currUserData, "<---------- in profileForm")
    const initialFormData = {
        firstName: currUserData.firstName,
        lastName: currUserData.lastName,
        email: currUserData.email
    };

    const initialFormCheck = {
        error: null,
        isLoading: null
    };

    const [formData, setFormData] = useState(initialFormData);
    const [formErrorAndLoad, setFormErrorAndLoad] = useState(initialFormCheck);

    // console.log("ProfileForm State -------> ", formData);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((currData) => {
            currData[name] = value;
            return { ...currData };
        });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setFormErrorAndLoad({ ...formErrorAndLoad, isLoading: true });
        //TODO: Change isLoading to isSaving
        try {
            await handleProfileEdit(formData);
            setFormErrorAndLoad({ isLoading: false, error: null });
        } catch (error) {
            console.log("ERROR with profile ----> ", error);
            setFormErrorAndLoad({ isLoading: false, error: error });
        }
    }

    function showStatus() {
        console.log(formErrorAndLoad, "<----- in showStatus");
        if (formErrorAndLoad.isLoading === true) {
            return "Loading...";
        } else if (formErrorAndLoad.isLoading === null) {
            return;
        } else if (formErrorAndLoad.isLoading === false && !formErrorAndLoad.error) {
            //TODO: move paragraph tags into return statements and simplify ternary
            return "Successful Change";
        } else {
            return;
        }
    }

    return (
        <form className="ProfileForm-form" onSubmit={handleSubmit}>
            <div className="ProfileForm-div">
                <input
                    id="ProfileForm-username"
                    className="form-control"
                    placeholder="Enter username..."
                    onChange={handleChange}
                    value={currUserData.username}
                    aria-label="UsernameInput"
                    readOnly>
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
                {showStatus() ? <p>{showStatus()}</p> : <></>}

                {formErrorAndLoad.error && (formErrorAndLoad.isLoading === false)
                    ? formErrorAndLoad.error.map((e, idx) =>
                        <p key={idx}>{e}</p>
                    )
                    : console.log(formErrorAndLoad, "error does not exist")
                }
                <button>Make Change</button>
            </div>
        </form>
    );
    //TODO: change isLoading to "savingStatus", change value
    //type to string
}


export default ProfileForm;