import React, { useState } from "react";

const ReportPage = () => {
  const [reports] = useState([
    {
      id: 1,
      title: "System Error",
      description: "Database connection issue",
      status: "Pending",
    },
    {
      id: 2,
      title: "User Feedback",
      description: "User unable to make a booking",
      status: "Resolved",
    },
    {
      id: 3,
      title: "Movie Listing Issue",
      description: "Movie not showing in the list",
      status: "Pending",
    },
    {
      id: 4,
      title: "Payment Gateway Failure",
      description: "Payment gateway timeout issue",
      status: "Resolved",
    },
  ]);

  const handleStatusChange = (id) => {
    alert(`Report ${id} status updated`);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto bg-gray-800 p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-semibold text-gray-200 mb-6">Report Page</h1>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto text-sm text-gray-300 border-collapse">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-4 text-sm font-medium">Report Title</th>
                <th className="p-4 text-sm font-medium">Description</th>
                <th className="p-4 text-sm font-medium">Status</th>
                <th className="p-4 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-t hover:bg-gray-700 transition-colors"
                >
                  <td className="p-4">{report.title}</td>
                  <td className="p-4">{report.description}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-4 py-2 rounded-md font-medium text-sm ${
                        report.status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-200"
                      onClick={() => handleStatusChange(report.id)}
                    >
                      {report.status === "Pending" ? "Resolve" : "Reopen"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
