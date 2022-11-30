import { useEffect, useState } from "react";
import JoblyApi from "./joblyApi";
import JobCard from "./JobCard";
import JobCardsList from "./JobCardsList";

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


 return (
    <div className="JobsList">
        {/* <SearchForm executeSearch={searchCompany}/> */}
        <div className="row" >
            <JobCardsList jobsList={jobsList} />
        </div>
    </div>
 )
}


export default JobsList;