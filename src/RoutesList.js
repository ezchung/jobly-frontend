import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import CompaniesList from "./CompaniesList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";

/**
 * 
 * @returns Routes to render components
 * 
 * JoblyApp -> RoutesList -> { CompanyDetail, CompaniesList, JobsList, Home }
 */
function RoutesList() {
  return (
    <Routes>
      <Route path="/companies/:name" element={<CompanyDetail />} />
      <Route path="/companies" element={<CompaniesList />} />
      <Route path="/jobs" element={<JobsList />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}


export default RoutesList;
