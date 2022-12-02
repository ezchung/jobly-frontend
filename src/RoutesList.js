import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import userContext from "./userContext";
import Home from "./Home";
import CompaniesList from "./CompaniesList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";
import Profile from "./Profile";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";


/** Component for managing routes
 * Props:  handleLogin(), handleSignUp()
 *
 * State:
 * 
 * Context: currUserData
 *
 * @returns Routes to render components
 *
 * JoblyApp
 *  -> RoutesList
 *    -> { CompanyDetail,
 *         CompaniesList,
 *         JobsList,
 *         Home,
 *         Profile,
 *         LoginForm ,
 *         SignUpForm }
 */
function RoutesList({ handleLogin, handleSignUp }) {

  const { currUserData } = useContext(userContext);

  return (
    <Routes>
      {currUserData
        ? (
          <>
            <Route path="/companies/:name" element={<CompanyDetail />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUpForm handleSignUp={handleSignUp} />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


export default RoutesList;
