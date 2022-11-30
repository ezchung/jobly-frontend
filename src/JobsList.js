import { useEffect, useState } from "react";
import JoblyApi from "./joblyApi";
import JobCardsList from "./JobCardsList";
import SearchForm from "./SearchForm";

/**
 * Props: None
 *
 * State:
 *      searchTerm: string
 *      jobsList: array like
 *          [ { id, title, salary, equity, companyHandle, companyName }, ...] 
 *
 * RoutesList => JobsList => { SearchForm, JobCardsList }
 */

function JobsList() {
    const [jobsList, setJobsList] = useState([]);

    console.log("JobsList State -----------> ", jobsList);

    useEffect(() => {
        async function getAllJobsFromApi(){
            const jobsResult = await JoblyApi.getAllJobs();
            setJobsList(jobsResult);
        }
        getAllJobsFromApi();
    }, []);

    async function searchJob(searchString){
        const resp = await JoblyApi.getSearchedJobs(searchString)
        setJobsList(resp);
    }


 return (
    <div className="JobsList">
        <SearchForm executeSearch={searchJob}/>
        <div className="row" >
            <JobCardsList jobsList={jobsList} />
        </div>
    </div>
 )
}


export default JobsList;