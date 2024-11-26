const ReportCard = () => {
  return (
    <div
      className={`w-[500px] h-[200px] shadow-md shadow-black flex items-center justify-center rounded`}
    >
      <div
        className={`w-[200px] h-full bg-gray-100 rounded-l flex flex-col justify-center items-center gap-5`}
      >
        <div
          className={`w-[90%] h-[60px] flex flex-col items-center justify-center border-b-2 border-gray-400 `}
        >
          <span
            className={`w-full h-full block font-semibold text-gray-400 text-lg `}
          >
            Name{" "}
          </span>
          <span className={`w-full h-full block font-medium text-lg`}>
            Vignesh
          </span>
        </div>
        <div
          className={`w-[90%] h-[60px] flex flex-col items-center justify-center border-b-2 border-gray-400 `}
        >
          <span
            className={`w-full h-full block font-semibold text-gray-400 text-lg `}
          >
            Email
          </span>
          <span className={`w-full h-full block font-medium text-lg`}>
            Vignesh@gmail.com
          </span>
        </div>
      </div>

      <div
        className={`w-[300px] h-full bg-white rounded-r flex flex-col items-center justify-center gap-2`}
      >
        <div
          className={`w-[90%] h-[30px] flex flex-col items-center justify-center`}
        >
          <span className={`w-full h-full block font-semibold text-lg`}>
            Refund Not Received
          </span>
        </div>
        <div
          className={`w-[90%] h-[140px] flex flex-col items-center justify-center`}
        >
          <span
            className={`w-full h-full px-2 indent-5 block text-black text-justify border-2 border-gray-200 rounded `}
          >
            I cancelled ticked due to some personal issue but still now.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
