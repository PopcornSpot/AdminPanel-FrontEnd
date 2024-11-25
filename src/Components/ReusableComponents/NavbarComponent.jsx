import React, { useState } from "react";
import { FaCircleUser, FaRegHeart, FaXmark } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImSearch } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import HeaderLogo from "../../assets/website_logo.png"


const NavBar = () => {

  const location = useLocation();

  const menuList = [
    { page: "Home", path: "/" },
    { page: "Movies", path: "/movies" },
    { page: "Theater", path: "/theater" },
    { page: "My Tickets", path: "/mytickets" },
    { page: "Insights", path: "/insights" },
  ];

  const [searchBarValue, setSearchBarValue] = useState(false);

  const handleSearchbarT = () => setSearchBarValue(true);

  const handleSearchbarF = () => setSearchBarValue(false);


  const [burgerValue, setBurgerValue] = useState(false);

  const handleBurgerF = () => setBurgerValue(false);

  const handleBurgerT = () => setBurgerValue(true);

  return (
    <nav className="fixed z-10">
      <div className="w-screen min-h-20 flex bg-[#181921] items-center justify-between ">
        <div className="max-w-[300px] px-6 min-h-20 flex items-center justify-start ">
          <img
            className="h-[100px] w-[140px]"
            src={HeaderLogo}
            alt=""
          />
        </div>

        <div className="max-w-[60%] min-h-20 max-lg:hidden font-medium flex justify-center  items-center gap-6 ">
          {menuList.map((value, index) => (
            <Link key={index} to={value.path}>
              <span
                className={`px-2 w-full min-h-20 pt-2 pb-7 font-medium ${
                  value.path === location.pathname
                    ? "text-[#F9B856] border-b-[3px] border-solid border-b-[#F9B856]"
                    : "text-white "
                } 
            hover:rounded-none hover:border-solid hover:border-b-[3px] hover:duration-500 hover:ease-linear  hover:border-b-white`}
              >
                {value.page}
              </span>
            </Link>
          ))}
        </div>

        <div className="min-w-[100px] min-h-20 pr-10 flex justify-end items-center gap-5">
          <Link>
            <ImSearch
              onClick={handleSearchbarT}
              className="max-lg:hidden text-2xl font-bold text-white"
            />
          </Link>
          <Link>
            <FaRegHeart className="max-lg:hidden text-2xl text-white" />
          </Link>
          <Link>
            <FaCircleUser className="max-lg:hidden text-2xl text-white" />
          </Link>
          <GiHamburgerMenu
            onClick={handleBurgerT}
            className={`lg:hidden font-bold text-2xl text-white`}
          />
        </div>
      </div>
      {searchBarValue === true ? (
        <>
          <div className="w-screen h-screen absolute top-20 bg-[#181921] opacity-80 flex justify-center items-center"></div>
          <div className="absolute top-0 w-screen h-screen flex items-center justify-center">
            <div className="w-[60%]  min-h-20 rounded flex bg-white justify-center items-center gap-4 px-10">
              <form className="w-full h-14 bg-[#F9B856] flex items-center justify-center">
                <input
                  className="h-full w-[80%] outline-2 px-2 text-xl outline-gray-400 outline rounded"
                  type="search"
                />
                <button className="w-[20%] h-full flex justify-center items-center gap-2">
                  <ImSearch className=" text-2xl font-bold text-black" />
                  <span className="font-medium text-xl">Search</span>
                </button>
              </form>
              <FaXmark
                onClick={handleSearchbarF}
                className="text-3xl w-[5%] cursor-pointer"
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}





      {burgerValue===true?(
        <>
      <div className="w-screen h-screen absolute top-0 bg-[#181921] opacity-80 flex justify-center items-center"></div>
      <div className="w-[300px] h-screen absolute top-0 right-0 bg-[#181921] flex flex-col items-center justify-start">
        <div className="w-[300px] h-20 flex justify-start items-center">
          <FaXmark
            onClick={handleBurgerF}
            className="text-3xl ml-3 text-white hover:scale-110 hover:duration-100 hover:ease-linear cursor-pointer"
          />
        </div>

        {menuList.map((value, index) => (
          <Link key={index} to={value.path}>
            <div
              className={`px-2 w-[300px] h-14 py-5 font-medium ${
                value.path === location.pathname
                  ? "text-[#F9B856] border-b-[3px] border-solid border-b-[#F9B856]"
                  : "text-white hover:border-solid hover:border-b-[3px] hover:duration-300 hover:ease-linear  hover:border-b-white"
              } 
             `}
            >
              {value.page}
            </div>
          </Link>
        ))}
        




      </div> </>)
      :
      <></>
      }

    </nav>
  );
};

export default NavBar;
