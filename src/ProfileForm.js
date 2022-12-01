import { useState } from "react";

/**
 * TODO: Edit variable names
 */
function ProfileForm({executeSearch}) {
    const [searchData, setSearchData] = useState("");

    console.log("SearchForm State -------> ", searchData);

    function handleChange(evt){
        const { value } = evt.target;
        setSearchData(value);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        executeSearch(searchData);
    }


}


export default ProfileForm;