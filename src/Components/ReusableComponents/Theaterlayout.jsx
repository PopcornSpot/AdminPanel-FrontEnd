import React from "react";
import { MdEventSeat } from "react-icons/md";

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
        row: row,
        section: section.label,
        number: seatIndex + 1,
        status: "available", 
      }))
    )
  );

  return (
    <div className={`p-6 flex items-center justify-center flex-col bg-gray-800`}>
      <div className={`space-y-10`}>
        {rows.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6">
            <h2 className={`text-xl font-semibold text-center underline text-gray-300`}>{section.label}</h2>
            <div className={`overflow-x-auto`}>
              {section.range.map((row) => (
                <div key={row} className={`flex items-center mb-4 text-gray-300`}>
                  <div className={`w-8 text-center font-bold`}>{row}</div>
                  <div className={`flex flex-wrap gap-2 justify-center`}>
                    {seatData
                      .filter((seat) => seat.row === row)
                      .map((seat) => (
                        <div
                          key={seat.id}
                          className={`w-10 h-10 flex items-center justify-center rounded border 
                            bg-gray-300 
                            ${seat.number === 4 || seat.number === 19 ? "ml-16" : ""}
                          `}
                          title={`Row ${seat.row}, Seat ${seat.number}`}
                        >
                          <MdEventSeat size={20} />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-16 w-full flex items-center justify-center h-[70px]`}>
        <div className={`w-[700px] h-[20px] bg-white text-gray-800 text-center flex items-center justify-center rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}>
          Theater Screen
        </div>
      </div>
    </div>
  );
};

export default TheaterLayout;
