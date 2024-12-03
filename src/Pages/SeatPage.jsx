import React from "react";

const SeatPage = () => {
  const screens = [
    { title: "Screen 1", totalSeat: 150, availableSeat: 100, bookedSeat: 50 },
    { title: "Screen 2", totalSeat: 200, availableSeat: 150, bookedSeat: 50 },
    { title: "Screen 3", totalSeat: 250, availableSeat: 200, bookedSeat: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-200 p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-200">Seat Availability</h1>

      </div>


      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mt-10">
        {screens.map((screen, index) => (
          <div
            key={index}
            className="bg-gray-700 shadow-lg rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-4">{screen.title}</h2>
            <p className="text-gray-300 text-lg mb-2">
              <span className="font-semibold">Total Seats:</span> {screen.totalSeat}
            </p>
            <p className="text-green-600 text-lg mb-2">
              <span className="font-semibold">Available Seats:</span> {screen.availableSeat}
            </p>
            <p className="text-red-600 text-lg">
              <span className="font-semibold">Booked Seats:</span> {screen.bookedSeat}
            </p>
          </div>
        ))}
      </div>


    </div>
  );
};

export default SeatPage;
