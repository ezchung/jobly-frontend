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
    <div>
      {jobsList.map((j) => (
          <div className="company-job row" key={j.id}>
            <JobCard job={j} />
          </div>
        ))}
    </div>
  );
}

export default JobCardsList;
