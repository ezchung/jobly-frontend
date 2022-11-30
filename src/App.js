import Home from "./Home";
import Nav from "./Nav";
import './App.css';
import { getAllCompanies, getJobsForCompany } from "./API";

function App() {
  getAllCompanies();
  getJobsForCompany("davis-davis");
  return (
    <div className="App">
      < Nav />
      < Home />

    </div>
  );
}

export default App;
