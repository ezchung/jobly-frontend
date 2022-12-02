import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCardsList from "./JobCardsList";
import JoblyApi from "./joblyApi";
import "./CompanyDetail.css";

/** Component for managing queried company details
 * Props: None
 *
 * State: companyData {
 *    isLoading: bool,
 *    company: object like { handle, name, description, numEmployees, logoUrl }
 * }
 *
 * Renders the detail of the company, along with a list of jobs for that
 * company (if there are any)
 *
 *  App -> Routes -> Companies/{handle} -> CompanyDetail -> JobCardsList
 */
function CompanyDetail() {

  const initialData = {
    isLoading: true,
    company: {}
  };
  const [companyData, setCompanyData] = useState(initialData);

  const { name } = useParams();

  console.log("CompanyDetail companyData---> ", companyData);

  /** Gets the company detail from API and sets company data to
   * state and isLoading to false.
    */
  useEffect(function getCompanyData() {
    async function getCompanyFromAPI() {
      const companyDetail = await JoblyApi.getCompany(name);
      setCompanyData({ company: companyDetail, isLoading: false });
    }
    getCompanyFromAPI();
  }, [name]);

  if (companyData.isLoading) {
    return (<div>Loading company data...</div>);
  }

  return (
    <div className="CompanyDetail container-fluid">
      <div className="CompanyDetail-info">
        <div className="CompanyDetail-row row">
          <h1>{companyData.company.name}</h1>
          <div col-md-4>
            <img src={companyData.company.logoUrl || "/logo192.png"} alt={companyData.company.handle} />
          </div>
          <div col-md-8>
            <p>{companyData.company.description}</p>
            <p><b>Number of Employees:</b> {companyData.company.numEmployees}</p>
          </div>
        </div>
      </div>

      <div className="CompanyDetail-jobs-list">
        <JobCardsList jobsList={companyData.company.jobs} />
      </div>
    </div>
  );
}


export default CompanyDetail;