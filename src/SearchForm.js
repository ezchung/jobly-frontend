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
function SearchForm({ executeSearch }) {
    const [searchData, setSearchData] = useState("");

    function handleChange(evt) {
        const { value } = evt.target;
        setSearchData(value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        executeSearch(searchData);
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
    );

}


export default SearchForm;