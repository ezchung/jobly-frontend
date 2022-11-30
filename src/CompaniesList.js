import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./joblyApi";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";

/**
 * Props: None
 *
 * State:
 *      searchTerm: string
 *      companyList: array like
 *          [ { handle, name, description, numEmployees, logoUrl }, ...]
 *
 * RoutesList => CompaniesList => { SearchForm, CompanyCard }
 */
function CompaniesList() {

    const [companiesList, setCompaniesList] = useState([]);

    console.log("CompaniesList companiesList------------> ", companiesList);

    useEffect(() => {
        async function getAllCompaniesFromAPI(){
            const companiesResult = await JoblyApi.getAllCompanies();
            setCompaniesList(companiesResult);
        }
        getAllCompaniesFromAPI();
    } , []);

    async function searchCompany(searchString){
        const resp = await JoblyApi.getSearchedCompanies(searchString)
        setCompaniesList(resp);
    }

    return (
      <div className="CompaniesList">
        <SearchForm executeSearch={searchCompany}/>
        {companiesList.map(c => (
          <div key={c.handle}>
            <Link to={`/companies/${c.handle}`}>
              <div className="row" >
                < CompanyCard company={c} />
              </div>
            </Link>
          </div>
        ))}

      </div>
    )

}


export default CompaniesList;