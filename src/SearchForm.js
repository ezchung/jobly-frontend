import { useState } from "react";

/**
 * Props:
 *      executeSearch: function from parent component
 * 
 * State: 
 *      formData: string
 * 
 * CompaniesList => SearchForm
 */ 
function SearchForm({executeSearch}) {
    const [searchData, setSearchData] = useState("");
    
    console.log("SearchForm State -------> ", searchData);

    function handleChange(evt){
        const { value } = evt.target;
        setSearchData(value);
    }
    //TODO: leave it the way it is with the setSearchData. get rid of line 25 for UI reasons
    function handleSubmit(evt){
        evt.preventDefault();
        executeSearch(searchData);
        setSearchData("");
    }

    return (
        <form className="SearchForm" onSubmit={handleSubmit}>
            <div className="mb-2">
                <input 
                    id="searchForm-id"
                    name="searchInput"
                    className="form-control"
                    placeholder="Enter search term..."
                    onChange={handleChange}
                    value={searchData}
                    aria-label="SearchInput">
                </input>
                <button className="btn">Submit</button>
            </div>
        </form>
    )
    
}


export default SearchForm;