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

const RouterComponent = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-gray-800 text-white fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-64 overflow-y-auto p-4">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/screen" element={<ScreenPage />} />
          <Route path="/seat" element={<SeatsPage />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/report" element={<ReportPage/>} />
        </Routes>
      </div>
    </div>
  );
};

export default RouterComponent;
