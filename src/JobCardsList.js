import JobCard from "./JobCard";

/**
 * Props:
 *      jobsList: array like
 *          [{ id, title, salary, equity, companyHandle, companyName },...]
 *
 * State:
 *
 * { CompanyDetail, JobsList } => JobCardsList => JobCard
 */ //TODO: the logic of no jobs? in the parent components
function JobCardsList({ jobsList }) {
  return (
    <div>
      {jobsList ? (
        jobsList.map((j) => (
          <div className="company-job row" key={j.id}>
            <JobCard job={j} />
          </div>
        ))
      ) : (
        <p>"This company has no jobs yet."</p>
      )}
    </div>
  );
}

export default JobCardsList;
