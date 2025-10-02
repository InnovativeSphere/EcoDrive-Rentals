import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Categories from "./Components/Categories";
import ElectricCarsPage from "./Components/ElectricCars";
import MechanicalCarsPage from "./Components/MechanicalCars";
import CarDetailsPage from "./Components/CarDetails";
import { Footer } from "./Components/Footer";
import HomePage from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import CheckoutPage from "./Components/CheckoutPage";
import RentalDetails from "./Components/RentalDetails";
import MyComplaints from "./Components/MyComplaints";
import EditComplaint from "./Components/EditComplaint";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/electric-cars" element={<ElectricCarsPage />} />
          <Route path="/mechanical-cars" element={<MechanicalCarsPage />} />
          <Route path="/car/:id" element={<CarDetailsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/rental/:id" element={<RentalDetails />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/complaints/edit/:id" element={<EditComplaint />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
