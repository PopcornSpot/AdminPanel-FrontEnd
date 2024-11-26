import { Link } from "react-router-dom";
import Profilebg from "../../assets/metallic-07.jpg"
import ProfileImage from "../../assets/ProfileImage.jpg" 
import { BlackVarient, GrayVarient, PrimaryColor, WhiteVarient } from "../ColorComponent/ColorComponent";


const Profile=()=>{

return(
<div className={`w-full  h-screen relative `}>
    <img
    className={`w-full h-[350px] max-sm:h-full`}
    src={Profilebg} alt="" />
    <div className={`w-full h-[350px] max-sm:h-full absolute top-0 bg-[${BlackVarient}] bg-opacity-80`}></div> 
<div className={`w-full h-screen absolute top-0 flex justify-center items-center`}>
<div className={`w-[60%] h-[70%] flex items-center sm:max-lg:w-[90%] max-sm:flex-col max-sm:h-[90%] max-sm:mt-0 max-sm:w-[90%] mt-28 bg-[${WhiteVarient}] rounded-lg shadow-md shadow-[${BlackVarient}]`}>
<img 
className={`w-[50%] h-full max-sm:w-[150px] max-sm:mt-5 max-sm:h-[150px] rounded-lg `}
src={ProfileImage} alt="" />
<div className={`w-full h-full flex flex-col items-center justify-center gap-5`}>
    <div className={`w-[90%] h-[70px] flex flex-col items-center justify-center border-b-2 border-[${GrayVarient}] `}>
    <span className={`w-full h-full block font-semibold text-[${GrayVarient}] text-lg `}>Name </span>
    <span className={`w-full h-full block font-medium text-lg`}>Vignesh</span>
    </div>

    <div className={`w-[90%] h-[70px] flex flex-col items-center justify-center border-b-2 border-[${GrayVarient}] `}>
    <span className={`w-full h-full block font-semibold text-[${GrayVarient}] text-lg `}>Email </span>
    <span className={`w-full h-full block font-medium text-lg`}>Vignesh@gmail.com</span>
    </div>

    <div className={`w-[90%] h-[70px] flex flex-col items-center justify-center border-b-2 border-[${GrayVarient}] `}>
    <span className={`w-full h-full block font-semibold text-[${GrayVarient}] text-lg `}>City </span>
    <span className={`w-full h-full block font-medium text-lg`}>Chennai</span>
    </div>

    <div className={`w-[90%] h-[70px] flex flex-col items-center justify-center border-b-2 border-[${GrayVarient}] `}>
    <span className={`w-full h-full block font-semibold text-[${GrayVarient}] text-lg `}>Contact </span>
    <span className={`w-full h-full block font-medium text-lg`}>8344024735</span>
    </div>

     <Link to={""}>
     <div className={`py-2 px-10 rounded mt-5 bg-[${PrimaryColor}]`}>
        Update</div>
     </Link>

</div>
</div>
</div>
</div>
)}


export default Profile;