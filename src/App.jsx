import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import Verify from "./auth/Verify";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import DashboardHome from "./pages/DashboardHome";
import ManageCars from "./pages/ManageCars";
import AddCar from "./pages/AddCar";
import ManageReviews from "./pages/ManageReviews";
import ManageEnquiries from "./pages/ManageEnquiries";
import EnquiryDetails from "./pages/EnquiryDetails";
import EditCar from './pages/EditCar';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/cars/:id' element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route
          path="/dashboard" element={
          <ProtectedRoute>
              <Dashboard />
          </ProtectedRoute>}
        >
          <Route index element={<DashboardHome />} />
          <Route path="cars" element={<ManageCars />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="enquiries" element={<ManageEnquiries />} />
          <Route path='enquiries/:id' element={<EnquiryDetails />} />
          <Route path="edit-car/:id" element={<EditCar />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
