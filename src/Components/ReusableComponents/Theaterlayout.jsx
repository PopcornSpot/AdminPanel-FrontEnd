import React from "react";
import { MdEventSeat } from "react-icons/md";
import SidebarComponent from "../SidebarComponent";

const TheaterLayout = () => {
  const rows = [
    { label: "DIAMOND (Rs. 190)", range: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"] },
    { label: "", range: ["L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"] },
    { label: "PEARL (Rs. 60)", range: ["V", "W"] },
  ];

  const seatsPerRow = 23;
  const seatData = rows.flatMap((section) =>
    section.range.flatMap((row) =>
      Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
        id: `${row}-${seatIndex + 1}`,
        row,
        section: section.label,
        number: seatIndex + 1,
        status: "available",
      }))
    )
  );

  return (
    <div className="flex h-screen bg-gray-900">

      <div className="w-56 fixed h-full bg-gray-700">
        <SidebarComponent />
      </div>


      <div className="flex-1 ml-56 p-6 space-y-10 overflow-auto">
        {rows.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6">

            {section.label && (
              <h2 className="text-xl font-semibold text-center underline text-gray-300">
                {section.label}
              </h2>
            )}


            <div className="overflow-x-auto">
              {section.range.map((row) => (
                <div key={row} className="flex items-center mb-4 text-gray-300">

                  <div className="w-8 text-center font-bold">{row}</div>


                  <div className="flex flex-wrap gap-2 justify-center">
                    {seatData
                      .filter((seat) => seat.row === row)
                      .map((seat) => (
                        <div
                          key={seat.id}
                          className={`w-10 h-10 flex items-center justify-center rounded border 
                            bg-gray-300 hover:bg-orange-400 transition 
                            ${seat.number === 4 || seat.number === 19 ? "ml-12" : ""}
                          `}
                          title={`Row ${seat.row}, Seat ${seat.number}`}
                        >
                          <MdEventSeat size={20} className="text-gray-800" />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}


        <div className="mt-16 w-full flex items-center justify-center">
          <div className="w-[700px] h-[30px] bg-white text-gray-800 text-center font-semibold flex items-center justify-center rounded-md shadow-lg">
            Theater Screen
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterLayout;
