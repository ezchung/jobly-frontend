import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./joblyApi";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";

/** 
 * Props: None
 *
 * State: //Possible addition of loading message. set initial state to null. line 33 setIsLoading(false)
 *      searchTerm: string //TODO: delete this state or storing what you are currently searching (line 31)
 *      companyList: array like 
 *          [ { handle, name, description, numEmployees, logoUrl }, ...]
 *
 * RoutesList => CompaniesList => { SearchForm, CompanyCard }
 */
function CompaniesList() {
//TODO: if search doesnt return anything
    const [companiesList, setCompaniesList] = useState([]);
//TODO: null (haven't made search yet) (didnt find anything)
    console.log("CompaniesList companiesList------------> ", companiesList);
    //TODO: give function name (rule of thumb: if it has more than one line)
    useEffect(() => {
        async function getAllCompaniesFromAPI(){
            const companiesResult = await JoblyApi.getAllCompanies();
            setCompaniesList(companiesResult);
        }
        getAllCompaniesFromAPI();
    } , []);
    //TODO: variable name. companies instead of resp 
    async function searchCompany(searchString){
        const resp = await JoblyApi.getSearchedCompanies(searchString)
        setCompaniesList(resp);
    } //TODO: logic for empty searchString. if empty string getAllCompanies

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