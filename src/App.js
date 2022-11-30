import Home from "./Home";
import Nav from "./Nav";
import { getAllCompanies, getJobsForCompany } from "./API";
import {
  Navigate,
  Routes,
  Route,
  BrowserRouter,
  Router,
} from "react-router-dom";
import RoutesList from "./RoutesList";

import './App.css';

function App() {
  getAllCompanies();
  getJobsForCompany("davis-davis");
  return (
    <div className="App">
      <BrowserRouter>
        < Nav />
        <RoutesList />
      </BrowserRouter>
    </div>
  );
}

export default App;
