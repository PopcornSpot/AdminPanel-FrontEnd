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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Report Page</h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 text-sm font-medium">Report Title</th>
                <th className="p-3 text-sm font-medium">Description</th>
                <th className="p-3 text-sm font-medium">Status</th>

                <th className="p-3 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-gray-100">
                  <td className="p-3 text-sm">{report.title}</td>
                  <td className="p-3 text-sm">{report.description}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-md ${
                        report.status === "Pending"
                          ? "bg-yellow-400 text-black"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="p-3 text-sm">
                    <button
                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
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
