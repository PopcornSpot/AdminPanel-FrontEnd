import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./PageNotFound";
import Home from "../HomeComponents/HomeMainComponent";


const ParentRouter = () => {
    return (
        <Routes>
          <Route path="*" element={<NotFoundPage/>} />
          <Route index element={<Home/>}/>
        </Routes>
    );
  };
  
  export default ParentRouter;