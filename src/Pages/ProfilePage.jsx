import React from "react";

const ProfilePage = () => {
  const adminDetail = {
    name: "Admin",
    email: "admin@example.com",
    contact: "1234567890",
    role: "Admin",
    theaterName: "Theater Name",
    theaterId: "123456",
    theaterLocation: "Location",
    image:
      "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?s=2048x2048&w=is&k=20&c=ZtS0t5PnIsdIvpLQ67zrmW6uKwQKwayRqh4GLuAlupA=",
    stats: {
      totaltheater: 3,
      activeTheater: 1,
      reports: 10,
    },
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Admin Profile
      </h1>

      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/3 flex items-center justify-center bg-white p-8">
          <img
            src={adminDetail.image}
            alt={`${adminDetail.name}'s profile`}
            className="w-48 h-48 object-cover rounded-full border-2 border-blue-400 shadow-lg"
          />
        </div>

        <div className="lg:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {adminDetail.name}
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Role:</span> {adminDetail.role}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {adminDetail.email}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {adminDetail.contact}
            </p>
            <p>
              <span className="font-semibold">Theater Name:</span>{" "}
              {adminDetail.theaterName}
            </p>
            <p>
              <span className="font-semibold">Theater Id:</span>{" "}
              {adminDetail.theaterId}
            </p>
            <p>
              <span className="font-semibold">Theater Location:</span>{" "}
              {adminDetail.theaterLocation}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
              <h3 className="text-blue-600 text-lg font-semibold">
                Total Theaters
              </h3>
              <p className="text-2xl font-bold text-blue-800">
                {adminDetail.stats.totaltheater}
              </p>
            </div>
            <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
              <h3 className="text-green-600 text-lg font-semibold">
                Active Theaters
              </h3>
              <p className="text-2xl font-bold text-green-800">
                {adminDetail.stats.activeTheater}
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-center">
              <h3 className="text-yellow-600 text-lg font-semibold">Reports</h3>
              <p className="text-2xl font-bold text-yellow-800">
                {adminDetail.stats.reports || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
