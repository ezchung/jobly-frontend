import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCardsList from "./JobCardsList";
import JoblyApi from "./joblyApi"

/**
 * Props: None
 *
 * State: company object like { handle, name, description, numEmployees, logoUrl }
 *
 * Renders the detail of the company, along with a list of jobs for that
 * company (if there are any)
 *
 *  App -> Routes -> Companies/{handle} -> CompanyDetail -> JobCardsList
 */
function CompanyDetail() {

  const [company, setCompany] = useState({});

  const {name} = useParams();

  console.log("CompanyDetail companyState --------> ", company);
  useEffect(() => {
    async function getCompanyFromAPI() {

      const companyDetail = await JoblyApi.getCompany(name);
      console.log("companyDetail in ")

      setCompany(companyDetail);
    }
    getCompanyFromAPI();
  }, [name] );

  // console.log(company);

  return (
    <div className="CompanyDetail">
      <div className="company-info">
        <div className="row">
          <h1>{company.name}</h1>
          <img src={company.logoUrl} alt={company.handle}/>
        </div>
        <p>{company.description}</p>
        <p><b>Number of Employees:</b> {company.numEmployees}</p>
      </div>

      <div className="company-jobs-list">
        <JobCardsList jobsList={company.jobs} />
      </div>
    </div>
  )
}


export default CompanyDetail;