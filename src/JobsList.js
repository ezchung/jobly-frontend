import { useEffect, useState } from "react";
import JoblyApi from "./joblyApi";
import JobCardsList from "./JobCardsList";
import SearchForm from "./SearchForm";

/**
 * Props: None
 *
 * State:  jobsList {
 *              isLoading: bool
 *              jobsList: array like
 *                 [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *          }
 * RoutesList => JobsList => { SearchForm, JobCardsList }
 */

function JobsList() {

    const initialData = {
        isLoading: true,
        jobs: []
    }
    const [jobsList, setJobsList] = useState(initialData);

    // console.log("JobsList State -----------> ", jobsList);

    useEffect(function getAllJobsData() {
        async function getAllJobsFromApi(){
            const jobsResult = await JoblyApi.getAllJobs();
            setJobsList({isLoading: false, jobs: jobsResult});
        }
        getAllJobsFromApi();
    }, []);

    async function searchJob(searchString){
        if (searchString === '') {
            const allJobs = await JoblyApi.getAllJobs();
            setJobsList({isLoading: false, jobs: allJobs});
        } else {
            const filteredJobs = await JoblyApi.getSearchedJobs(searchString)
            setJobsList({isLoading: false, jobs: filteredJobs});
        }
    }

    if (jobsList.jobs.length === 0 && !jobsList.isLoading) {
        return (
            <div>There are no jobs that match your search.</div>
        )
    }


 return (
    <div className="JobsList">
        <SearchForm executeSearch={searchJob}/>
        <div className="JobsList-row row" >
            <JobCardsList jobsList={jobsList.jobs} />
        </div>
    </div>
 )
}


export default JobsList;