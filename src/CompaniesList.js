import React, {useEffect, useState} from "react";
import { getAllCompanies } from "./API";
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
            const companiesResult = await getAllCompanies();
            setCompaniesList(companiesResult);
        }
        getAllCompaniesFromAPI();
    }, []);

    console.log(companiesList, "<-------- companiesList")

}


export default CompaniesList;