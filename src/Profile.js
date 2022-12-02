import { useState } from "react";
import ProfileForm from "./ProfileForm";

/**
 * Props: will get applied f'n from Jobly
 * 
 * State: 
 * 
 * { Nav, RoutesList } => Profile => { EditProfileForm }
 */
function Profile() {
    return (
        <div className="Profile">
            <ProfileForm />
        </div>
    )
}


export default Profile;