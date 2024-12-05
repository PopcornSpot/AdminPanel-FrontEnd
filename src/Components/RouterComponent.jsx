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

const RouterComponent = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-64 overflow-y-auto">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/screen" element={<ScreenPage />} />
          <Route path="/seat" element={<SeatsPage />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/report" element={<ReportPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/addmovie" element={<AddMovieForm/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default RouterComponent;
