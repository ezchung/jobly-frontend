import React from "react";
import "./CompanyCard.css";

/** Component for creating company card (Presentational)
 *
 * Props: Company object like:
 *  { handle, name, description, numEmployees, logoUrl }
 *
 * State: None
 *
 * RoutesList => CompaniesList => CompanyCard
 */
function CompanyCard({ company }) {


  return (
    <div className="CompanyCard card mb-3">
      <div className="CompanyCard-row row g-0">
        <div className="CompanyCard-col col-md-4 my-auto">
          <img className="CompanyCard-img img-fluid rounded-start"
            src={company.logoUrl || "/logo192.png"}
            alt={company.handle} />
        </div>
        <div className="CommpanyCard col-md-8">
          <div className="CompanyCard card-body">
            <h3 className="CompanyCard card-title">{company.handle}</h3>
            <p className="CompanyCard card-text"><i>{company.description}</i></p>
            <p className="CompanyCard card-text"><b>Number of Employees:</b> {company.numEmployees}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CompanyCard;