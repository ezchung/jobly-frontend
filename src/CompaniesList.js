import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api"
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
    const [searchTerm, setSearchTerm ] = useState(null);
    const [companiesList, setCompaniesList] = useState([]);

    useEffect(function getCompanies(){
        async function getAllCompaniesFromAPI(){
            const companiesResult = await JoblyApi.getAllCompanies();
            setCompaniesList(companiesResult);
        }
        getAllCompaniesFromAPI();
    }, []);

    return (
      <div className="CompaniesList">
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