import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import OverviewPage from "../Pages/OverviewPage";
import MoviesPage from "../Pages/MoviesPage";
import SeatsPage from "../Pages/SeatPage";
import VotingPage from "../Pages/VotingPage";
import ScreenPage from "../Pages/ScreenPage";
import ProfilePage from "../Pages/ProfilePage";
import ReportPage from "../Pages/ReportPage";
import LoginPage from "../Pages/LoginPage";
import AddMovieForm from "../Pages/MovieAddingPage";
import ProfileEditPage from "../Pages/ProfileEditPage";
import ReportForm from "../Pages/ReportFormPage";
import NotFoundPage from "../Pages/NotFoundPage";
import TheaterLayout from "./ReusableComponents/Theaterlayout";
import AddScreenForm from "../Pages/ScreenAddingPage";
// import ReportForm from "../Pages/ReportFormPage";
// import ProfileEditPage from "../Pages/ProfileEditPage";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/home" element={<OverviewPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/theaterlayout" element={<TheaterLayout />} />
      <Route path="/screen" element={<ScreenPage />} />
      <Route path="/seat" element={<SeatsPage />} />
      <Route path="/voting" element={<VotingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/addscreen" element={<AddScreenForm />} />
      <Route path="/addmovie" element={<AddMovieForm />} />
      <Route path="/updatemovie/:_id" element={<AddMovieForm />} />
      <Route path="/editprofile/:_id" element={<ProfileEditPage />} />
      <Route path="/addreport" element={<ReportForm />} />
    </Routes>
  );
};

export default RouterComponent;
