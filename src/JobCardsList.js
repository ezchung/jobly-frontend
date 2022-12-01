import JobCard from "./JobCard";

/**
 * Props:
 *      jobsList: array like
 *          [{ id, title, salary, equity, companyHandle, companyName },...]
 *
 * State:
 *
 * { CompanyDetail, JobsList } => JobCardsList => JobCard
 */
function JobCardsList({ jobsList }) {
  return (
    <div className="JobCardsList row">
      {jobsList.map((j) => (
          <div className="JobCardsList-card col-md-4" key={j.id}>
            <JobCard job={j} />
          </div>
        ))}
    </div>
  );
}

export default JobCardsList;
