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
        savingStatus: null
    };

    const [formData, setFormData] = useState(initialFormData);
    const [formErrorAndLoad, setFormErrorAndLoad] = useState(initialFormCheck);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((currData) => {
            currData[name] = value;
            return { ...currData };
        });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setFormErrorAndLoad({ ...formErrorAndLoad, savingStatus: "saving" });
        try {
            await handleProfileEdit(formData);
            setFormErrorAndLoad({ savingStatus: "notSaving", error: null });
        } catch (error) {
            console.log("ERROR with profile ----> ", error);
            setFormErrorAndLoad({ savingStatus: "notSaving", error: error });
        }
    }

    function showStatus() {
        if (formErrorAndLoad.savingStatus === "saving") {
            return <p>"Loading..."</p>;
        } else if (formErrorAndLoad.savingStatus === null) {
            return;
        } else if (formErrorAndLoad.savingStatus === "notSaving" && !formErrorAndLoad.error) {
            return <p>"Successful Change"</p>;
        } else {
            return null;
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
                {showStatus()}

                {formErrorAndLoad.error && (formErrorAndLoad.savingStatus === "notSaving")
                    ? formErrorAndLoad.error.map((e, idx) =>
                        <p key={idx}>{e}</p>
                    )
                    : console.log(formErrorAndLoad, "error does not exist")
                }
                <button>Make Change</button>
            </div>
        </form>
    );
}


export default ProfileForm;