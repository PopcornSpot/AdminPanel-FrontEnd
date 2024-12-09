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
import SidebarComponent from "../Components/SidebarComponent";

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
        borderColor: "#F97316",
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#F97316",
      },
    ],
  };

  const ticketsData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Tickets Sold",
        data: [300, 400, 450, 500, 550, 567],
        backgroundColor: "#F97316",
        borderColor: "#EA580C",
        borderWidth: 1,
        hoverBackgroundColor: "#EA580C",
      },
    ],
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-56 fixed h-full">
        <SidebarComponent/>
      </div>
      <div className="flex-1 ml-56 overflow-y-auto">
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen font-sans text-gray-200">

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold">Dashboard Overview</h1>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-gray-400">{stat.title}</h3>
            <p className="text-4xl font-bold text-gray-100">{stat.value}</p>
            <p
              className={`text-sm mt-2 font-medium ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"
                }`}
            >
              {stat.change} since last month
            </p>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            Revenue Trend
          </h2>
          <Line data={revenueData} />
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            Tickets Sold
          </h2>
          <Bar data={ticketsData} />
        </div>
      </div>


      <div>
        <h2 className="text-xl font-semibold mb-6 text-gray-300">
          Recent Activity
        </h2>
        <ul className="space-y-4">
          <li className="p-4 bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-100 font-medium">
              Subhashini purchased tickets for Amaran
            </p>
            <span className="text-gray-500 text-sm">5 minutes ago</span>
          </li>
          <li className="p-4 bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-100 font-medium">New user registered.</p>
            <span className="text-gray-500 text-sm">10 minutes ago</span>
          </li>
          <li className="p-4 bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-100 font-medium">
              Revenue increased by 15% this week.
            </p>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </li>
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
};

export default OverviewPage;
