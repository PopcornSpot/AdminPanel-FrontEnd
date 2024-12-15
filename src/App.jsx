import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddVotingPage from "./Pages/CreatePoll";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import OverviewPage from "./Pages/OverviewPage";
import MoviesPage from "./Pages/MoviesPage";
import TheaterLayout from "./Components/ReusableComponents/Theaterlayout";
import ScreensPage from "./Pages/ScreenPage";
import VotingResultsCard from "./Pages/VotingPage";
import ProfilePage from "./Pages/ProfilePage";
import ReportPage from "./Pages/ReportPage";
import AddScreenForm from "./Pages/ScreenAddingPage";
import AddMovieForm from "./Pages/MovieAddingPage";
import ProfileEditPage from "./Pages/ProfileEditPage";
import ReportForm from "./Pages/ReportFormPage";
import AddTheatreForm from "./Pages/theatreAddingForm";
import TheatrePage from "./Pages/theatrePage";
import ShowPage from "./Pages/ShowPage";
import AddShow from "./Pages/ShowAddindPage";
import ForgotPassword from "./Pages/ForgotPassword";
import SeatPage from "./Pages/SeatPage";
import PrivateRoute from "./Components/PrivateRouterComp";


const AppComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/Resetpassword" element={<ForgotPassword/>} />
      <Route path="*" element={<NotFoundPage />} />

      <Route element={<PrivateRoute />}>
      <Route path="/home" element={<OverviewPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/theaterlayout" element={<TheaterLayout />} />
      <Route path="/screen" element={<ScreensPage />} />
      <Route path="/seat" element={<SeatPage />} />
      <Route path="/voting" element={<VotingResultsCard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/addscreen" element={<AddScreenForm />} />
      <Route path="/editscreen/:_id" element={<AddScreenForm />} />
      <Route path="/addmovie" element={<AddMovieForm />} />
      <Route path="/updatemovie/:_id" element={<AddMovieForm />} />
      <Route path="/editprofile/:_id" element={<ProfileEditPage />} />
      <Route path="/addreport" element={<ReportForm />} />
      <Route path="/addtheatre" element={<AddTheatreForm />} />
      <Route path="/edittheatre/:_id" element={<AddTheatreForm />} />
      <Route path="/theatre" element={<TheatrePage />} />
      <Route path="/show" element={<ShowPage/>} />
      <Route path="/addshow" element={<AddShow/>} />
      <Route path="/editshow/:_id" element={<AddShow />} />
      <Route path="/addvoting" element={<AddVotingPage/>} />
      </Route>
    </Routes>
  );
};

export default AppComponent;
