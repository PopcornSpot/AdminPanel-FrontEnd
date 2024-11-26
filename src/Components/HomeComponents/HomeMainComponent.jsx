import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import NavBar from "../ReusableComponents/NavbarComponent";
import HeroSection from "./HeroSectionComp";
import DashBoardSection from "./HeroSectionComp";

const Chart = ()=>{
 
 
  const percentage = 55;

return(

  <div className="w-[500px] h-[500px]">
   
   <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={8}
        styles={buildStyles({
          textColor: "red",
          pathColor: "#F9B856 ",
          trailColor: "gray",
          textSize: "14px",
          strokeLinecap:"round",
          text:"center"
        })}
      />
  </div>
)

}







const Home = () => {
  return (
    <>
     <header>
      <NavBar/>
     </header>
    </>
  );
};

export default Home;
