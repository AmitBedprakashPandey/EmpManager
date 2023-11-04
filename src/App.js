import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import PunchDetails from "./Pages/PunchDetails";
import Navbar from "./Components/Navbar";
import CustomerVisitList from "./Pages/CustomerVisitList";
import VisitPunch from "./Pages/VisitPunch";
import LoginPage from "./Pages/LoginPage";
import NotFundPage from "./Pages/NotFundPage";
import Customer from "./Pages/Customer";

function App() {
  return (
    <>
      <NotFundPage />
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/pucnhdetails" element={<PunchDetails />} />
        <Route path="/Customervisitlist" element={<CustomerVisitList />} />
        <Route path="/visitpunch" element={<VisitPunch />} />
        <Route path="/customer" element={<Customer/>} />
      </Routes>
    </>
  );
}

export default App;
