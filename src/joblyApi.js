import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN

  static token = null;

  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // Individual API routes

  /********************** COMPANIES  ***************************/

  /**
     * Makes API call with axios to get all companies
     * { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
     */
  static async getAllCompanies() {
    const res = await this.request(`companies`);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**
     * Make API call to get all jobs
     * { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
     */
  static async getAllJobs() {
    const res = await this.request(`jobs`);
    return res.jobs;
  }

  /**
   * Make API call with filter to get specific companies
   *    Filters sent through query string params nameLike
   */
  static async getSearchedCompanies(searchTerm) {
    let res = await this.request(`companies?nameLike=${searchTerm}`);
    return res.companies;
  }

  /**
   * Make API call with filter to get specific companies
   *    Filters sent through query string params title
   */
  static async getSearchedJobs(searchTerm) {
    let res = await this.request(`jobs?title=${searchTerm}`);
    return res.jobs;
  }

  /************************ USER  **************************/

  /**
   * Make API call to /token and get token back
   */
  static async getLoggedInUserToken(formData) {
    let res = await this.request(`auth/token`, formData, "post");
    this.token = res.token;
    return res.token;
  }

  /**
   * Make API call to /register to create new user
   */
  static async getNewUserToken(formData) {
    let res = await this.request(`auth/register`, formData, "post");
    this.token = res.token;
    return res.token;
  }

  /**
   * Make API call to get individual user data
   */
  static async getUserData(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /**
   * Make API call to add applied jobs
   */
  static async patchUserData(formData, username) {
    let res = await this.request(`users/${username}`, formData, "patch");
    return res;
  }
}

export default JoblyApi;
