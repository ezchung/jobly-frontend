import React from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001/"

/**
 * Makes API call with axios to get all companies
 * { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 */
async function getAllCompanies(){
    const resp = await axios.get(`${BASE_URL}companies`);
    // console.log(resp, "<<<<<<<<<<<< getAllCompanies")
    return resp.data.companies;
}

/**
 * Make API call to get all jobs
 * { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
 */
async function getAllJobs(){
    const resp = await axios.get(`${BASE_URL}jobs`);
    // console.log(resp, "<<<<<<<<<<<< getAllJobs")
    return resp.data.jobs;
}

/**
 * Make API call to get all jobs of one company
 * Company is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 */
async function getJobsForCompany(handle){
    const resp = await axios.get(`${BASE_URL}companies/${handle}`);
    // console.log(resp, "<<<<<<<<<<<< getJobsForCompany")
    return resp.data.company;
}

export {getAllCompanies, getAllJobs, getJobsForCompany}