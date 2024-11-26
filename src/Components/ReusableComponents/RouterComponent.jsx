import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./PageNotFound";
import Home from "../HomeComponents/HomeMainComponent";
import CreateAdmin from "../AdminCreationComp/CreateAdmin";
import Profile from "../ProfileComponent/ProfileComp";
import ReportCard from "../ReportComponent/ReportComp";

const ParentRouter = () => {
    return (
        <Routes>
          <Route path="*" element={<NotFoundPage/>} />
          <Route index element={<Home/>}/>
          <Route path="createadmin" element={<CreateAdmin/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="report" element={<ReportCard/>}/>
        </Routes>
    );
  };
  
  export default ParentRouter;