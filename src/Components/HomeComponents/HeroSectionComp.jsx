// import { Bar } from "react-chartjs-2";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaUserAlt } from "react-icons/fa";
// import { BarChart } from '@rsuite/charts'; 


const DashBoardSection =()=>{

    const totalTheatre=300

    const percentage=90

   

return(
 <div className="w-full min-h-screen bg-gray-200 flex flex-col justify-start pl-28 items-start">   
<div className="w-full h-full flex items-start pt-5 justify-start flex-wrap gap-10"> 

<div className="w-[250px] h-[120px] bg-white rounded-lg shadow-md shadow-gray-500 flex justify-center items-center">
<FaUserAlt className="text-center text-6xl"/>
<div className="w-[60%] h-full flex flex-col justify-center items-center gap-2">
<span className="font-medium text-gray-500">Total Theatres</span>
<span className="font-semibold text-xl ">{totalTheatre}</span>      
</div>  
</div>



<div className="w-[250px] h-[120px] bg-white rounded-lg shadow-md shadow-gray-500 flex justify-center items-center">
<FaUserAlt className="text-center text-6xl"/>
<div className="w-[60%] h-full flex flex-col justify-center items-center gap-2">
<span className="font-medium text-gray-500">Total Theatres</span>
<span className="font-semibold text-xl ">{totalTheatre}</span>      
</div>  
</div>



<div className="w-[250px] h-[120px] bg-white rounded-lg shadow-md shadow-gray-500 flex justify-center items-center">
<FaUserAlt className="text-center text-6xl"/>
<div className="w-[60%] h-full flex flex-col justify-center items-center gap-2">
<span className="font-medium text-gray-500">Total Theatres</span>
<span className="font-semibold text-xl ">{totalTheatre}</span>      
</div>  
</div>



<div className="w-[250px] h-[120px] bg-white rounded-lg shadow-md shadow-gray-500 flex justify-center items-center">
<FaUserAlt className="text-center text-6xl"/>
<div className="w-[60%] h-full flex flex-col justify-center items-center gap-2">
<span className="font-medium text-gray-500">Total Theatres</span>
<span className="font-semibold text-xl ">{totalTheatre}</span>      
</div>  
</div>



<div className="w-[250px] h-[120px] bg-white rounded-lg shadow-md shadow-gray-500 flex justify-center items-center">
<FaUserAlt className="text-center text-6xl"/>
<div className="w-[60%] h-full flex flex-col justify-center items-center gap-2">
<span className="font-medium text-gray-500">Total Theatres</span>
<span className="font-semibold text-xl ">{totalTheatre}</span>      
</div>  
</div>


</div>

<div className="w-[300px] h-[300px] pt-10 ">
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
          text:"center",
         
        })}
      />
</div>


<div style={{ maxWidth: "650px" }}>


</div>

</div>
)
    
}



export default DashBoardSection;