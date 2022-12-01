import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./joblyApi";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";

/**
 * Props: None
 *
 * State: companies {
 *              isLoading: bool
 *              companyList: array like
 *                   [ { handle, name, description, numEmployees, logoUrl }, ...]
 *        }
 *
 * RoutesList => CompaniesList => { SearchForm, CompanyCard }
 */
function CompaniesList() {

  const initialData = {
    isLoading: true,
    companiesList: []
  }

    const [companies, setCompanies] = useState(initialData);

    console.log("CompaniesList companiesList------------> ", companies.companiesList);

    useEffect( function getAllCompaniesData() {
        async function getAllCompaniesFromAPI(){
            const companiesResult = await JoblyApi.getAllCompanies();
            setCompanies({isLoading: false, companiesList: companiesResult});
        }
        getAllCompaniesFromAPI();
    } , []);

    async function searchCompany(searchString){
      if (searchString === '') {
        const allCompanies = await JoblyApi.getAllCompanies();
        setCompanies({isLoading: false, companiesList: allCompanies});
      } else {
        const filteredCompanies = await JoblyApi.getSearchedCompanies(searchString)
        setCompanies({isLoading: false, companiesList: filteredCompanies});
      }
    }

    if (companies.companiesList.length == 0 && !companies.isLoading) {
      return (
        <div>There are no companies that match your search.</div>
      )
    }
    return (
      <div className="CompaniesList">
        <SearchForm executeSearch={searchCompany}/>
        <div className="CompaniesList row">
        {companies.companiesList.map(c => (
            <div key={c.handle} className="CompaniesList col-md-4">
              <Link to={`/companies/${c.handle}`} 
                    className="CompaniesList stretched-link"></Link>
                <div className="CompaniesList" >
                  < CompanyCard company={c} />
                </div>
            </div>
          ))}
        </div>

      </div>
    )

}


export default CompaniesList;