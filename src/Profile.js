import { useState } from "react";
import ProfileForm from "./ProfileForm";

/**
 * Props: will get applied f'n from Jobly
 * 
 * State: 
 * 
 * { Nav, RoutesList } => Profile => { EditProfileForm }
 */
function Profile({handleProfileEdit}) {
    return (
        <div className="Profile">
            <ProfileForm handleProfileEdit={handleProfileEdit}/>
        </div>
    )
}


export default Profile;