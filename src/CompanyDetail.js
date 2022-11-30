import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api"

/**
 * Props: None
 *
 * State: company object like { handle, name, description, numEmployees, logoUrl }
 *
 * Renders the detail of the company, along with a list of jobs for that
 * company (if there are any)
 *
 *  App -> Routes -> Companies/{handle}
 */
function CompanyDetail() {

  const [company, setCompany] = useState({});

  const {name} = useParams();

  useEffect(function getCompany(){
    async function getCompanyFromAPI() {

      const companyDetail = await JoblyApi.getCompany(name);
      console.log("companyDetail in ")

      setCompany(companyDetail);
    }
    getCompanyFromAPI();
  }, [] );

  console.log(company);


  return (
    <div className="CompanyDetail">
      <div className="company-info">
        <div className="row">
          <h1>{company.name}</h1>
          <img src={company.logoUrl} />
        </div>
        <p>{company.description}</p>
        <p><b>Number of Employees:</b> {company.numEmployees}</p>
      </div>

      <div className="company-jobs-list">
        {company.jobs
          ? (
          company.jobs.map( j => (
            <div className="company-job row" key={j.id}>
              <h3>{j.id}:  {j.title}</h3>
              <p><b>Salary: </b>{j.salary}</p>
              <p><b>Equity: </b>{j.equity ? j.equity : "None" }</p>
            </div>
          ))
          ) : (
            <p>"This company has no jobs yet."</p>
          )
        }

      </div>
    </div>
  )
}


export default CompanyDetail;