
import { Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "./userContext";
import "./Home.css"

/**
 * Props: None
 *
 * State: None
 *
 * @returns Home component
 *
 * JoblyApp => Home
 */
function Home() {

  const { currUserData } = useContext(userContext);

  return (
    <div>
      {currUserData
        ? (
          <div className="Home-logged-in">
            <h1>Welcome back, {currUserData.username} </h1>
          </div>
        ) : (
          <div className="Home">
            <h3>Find Your Best Career Fit with...</h3>
            <h1>Fits</h1>
            <div className="Home-buttons">
              <Link to="/login" className="btn btn-primary">Find Job Now</Link>
              {/* <Link to="/signup" className="btn btn-primary">Signup</Link> */}
            </div>
          </div>
        )}
    </div>
  );
}

export default Home;