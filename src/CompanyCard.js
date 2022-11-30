import React from "react";

/** Component for creating company card (Presentational)
 * 
 * Props: Company object like:
 *  { handle, name, description, numEmployees, logoUrl }
 *
 * State: None
 *
 * RoutesList => CompaniesList => CompanyCard
 */
function CompanyCard({company}) {

  return (
    <div className="CompanyCard">
      <h3>{company.handle}</h3>
      <img src={company.logoUrl} alt={company.handle}/>
      <p><i>{company.description}</i></p>
      <p><b>Number of Employees:</b> {company.numEmployees}</p>
    </div>
  )
}


export default CompanyCard;