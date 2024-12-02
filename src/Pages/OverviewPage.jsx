import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OverviewPage = () => {
  const stats = [
    { title: "Total Users", value: "1,234", change: "+12%" },
    { title: "Tickets Sold", value: "567", change: "+8%" },
    { title: "Revenue", value: "$12,345", change: "+15%" },
    { title: "Movies", value: "45", change: "-2%" },
  ];

  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 8000, 9000, 11000, 12345],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const ticketsData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Tickets Sold",
        data: [300, 400, 450, 500, 550, 567],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      </div>

      <div className="w-full h-[200px] flex items-center justify-center gap-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="w-[200px] h-[200px] bg-white flex items-center justify-center flex-col gap-4"
          >
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p
              className={`text-sm font-medium ${
                stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change} since last month
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Revenue Trend
          </h2>
          <Line data={revenueData} />
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tickets Sold
          </h2>
          <Bar data={ticketsData} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-4">
          <li className="bg-white shadow p-4 rounded-lg">
            <p className="text-gray-800 font-medium">
              Subhashini purchased tickets for Amaran
            </p>
            <span className="text-gray-500 text-sm">5 minutes ago</span>
          </li>
          <li className="bg-white shadow p-4 rounded-lg">
            <p className="text-gray-800 font-medium">New user registered.</p>
            <span className="text-gray-500 text-sm">10 minutes ago</span>
          </li>
          <li className="bg-white shadow p-4 rounded-lg">
            <p className="text-gray-800 font-medium">
              Revenue increased by 15% this week.
            </p>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewPage;
