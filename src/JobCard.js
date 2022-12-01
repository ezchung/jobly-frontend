import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css"

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
      <div className="JobCard card mb-3">
        <div className="card-body ">
          <h5 className="card-title">{job.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Job Id: {job.id}</h6>
          <p className="card-text"><b>Salary:</b> {job.salary}</p>
          <p className="card-text"><b>Equity:</b> {job.equity}</p>
          <Link to={`/companies/${job.companyHandle}`}>{job.companyName}</Link>
        </div>
      </div>
  )
}


export default JobCard;