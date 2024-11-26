import { Link } from "react-router-dom";
import Adminbg from "../../assets/fusion-01.jpg";

const CreateAdmin = () => {
  return (
    <div className={`w-full h-full`}>
      <img
        className={`w-full h-screen max-sm:h-[1200px] relative`}
        src={Adminbg}
        alt=""
      />
      <div
        className={`w-full h-full absolute top-0 bg-black bg-opacity-90 max-sm:h-[1200px] flex items-center justify-center`}
      >
        <form
          className="py-10 bg-white bg-opacity-10 text-white rounded-xl  px-10 flex max-sm:w-[350px] max-sm:h-[1100px] flex-col h-[600px] w-[650px] gap-5 justify-center items-center"
          // onSubmit={handleOnSubmit}
        >
          <div className={`w-full h-16 font-semibold text-2xl text-center`}>
            Create Admin
          </div>
          <div
            className={`w-full h-full flex justify-center max-sm:flex-col max-sm:gap-3 items-center gap-8`}
          >
            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full text-white font-medium">
                Name*
              </label>
              <input
                className="border-solid outline-none text-black font-medium  border-b-[2px] px-2 rounded h-[40px] w-full"
                id="name"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                Mobile No*
              </label>
              <input
                className="outline-none font-medium rounded text-black px-2 h-[40px] w-full"
                id="name"
                type="text"
                required
              />
            </div>
          </div>

          <div
            className={`w-full h-full flex justify-center max-sm:flex-col max-sm:gap-3 items-center gap-8`}
          >
            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                Email*
              </label>
              <input
                className="outline-none font-medium px-2 rounded text-black h-[40px] w-full"
                id="name"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                Screens*
              </label>
              <input
                className="rounded text-black outline-none font-medium  h-[40px] w-full"
                id="name"
                type="text"
                required
              />
            </div>
          </div>

          <div
            className={`w-full h-full flex justify-center max-sm:flex-col max-sm:gap-3 items-center gap-8`}
          >
            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                Theatre Name*
              </label>
              <input
                className="rounded text-black outline-none font-medium px-2 h-[40px] w-full"
                id="name"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                Theatre ID*
              </label>
              <input
                className="rounded text-black outline-none font-medium px-2 h-[40px] w-full"
                id="name"
                type="text"
                required
              />
            </div>
          </div>

          <div
            className={`w-full h-full flex justify-center max-sm:flex-col max-sm:gap-3 items-center gap-8`}
          >
            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                Theatre Location*
              </label>
              <input
                className="rounded text-black outline-none font-medium px-2 h-[40px] w-full"
                id="name"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                pincode*
              </label>
              <input
                className="rounded text-black outline-none font-medium px-2 h-[40px] w-full"
                id="name"
                type="text"
                required
              />
            </div>
          </div>

          <div
            className={`w-full h-full flex justify-center max-sm:flex-col max-sm:gap-3 items-center gap-8`}
          >
            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                Password*
              </label>
              <input
                className="rounded text-black outline-none font-medium px-2 h-[40px] w-full"
                id="name"
                type="password"
                required
              />
            </div>

            <div className="flex flex-col w-full h-full justify-center items-start">
              <label for="name" className="w-full font-medium">
                Conform Password*
              </label>
              <input
                className="rounded text-black outline-none font-medium px-2 h-[40px] w-full"
                id="name"
                type="password"
                required
              />
            </div>
          </div>

          <div
            className={`w-full h-full flex items-center max-sm:flex-col justify-center max-sm:gap-0 gap-10`}
          >
            <div className="w-full h-full flex-1 flex justify-center items-center">
              <button
                className="px-6 w-full bg-gradient-to-r bg-[#F9B856] text-black py-3 rounded font-medium hover:bg-gradient-to-r hover:from-white hover:to-[#F9B856]"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className="w-full h-full flex-1 flex justify-center items-center">
              <button
                className="px-6 w-full bg-gradient-to-r bg-[#F9B856] text-black py-3 rounded font-medium hover:bg-gradient-to-r hover:from-white hover:to-[#F9B856]"
                type="reset"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
