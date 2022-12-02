
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "./userContext";

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

  const { token, username } = useContext(userContext);

  return(
    <div>
      {token
        ? (
          <div className="Home-logged-in">
            <h1>Welcome back, {username} </h1>
          </div>
        ) : (
          <div className="Home">
          <div className="Home-buttons">
            <Link to="/login" className="btn btn-primary">Log In</Link>
            <Link to="/signup" className="btn btn-primary">Signup</Link>
          </div>
        </div>
        )}
    </div>
  )
}

export default Home;