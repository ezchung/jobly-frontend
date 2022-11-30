import React from "react";

/**
 * Props: Job object like:
 *  { id, title, salary, equity, companyHandle, companyName }
 *
 * State: None
 *
 * RoutesList => JobsList => JobCard
 */

function JobCard({job}) {
    return (
        <div className="JobCard">
        <h3>{job.title}</h3>
        <p><i>{job.id}</i></p>
        <p><b>Company:</b> {job.companyName}</p>
        <p><b>Salary:</b> {job.salary}</p>
        <p><b>Equity:</b> {job.equity}</p>
        </div>
  )
}


export default JobCard;