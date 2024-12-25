import React, { useEffect, useState } from "react";
import { FaUsers, FaTicketAlt, FaMoneyBillAlt, FaFilm } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from "recharts";
import axios from "axios";
import { toast } from "react-toastify";
import SidebarComponent from "../Components/SidebarComponent";

const OverviewPage = () => {
  const authToken = localStorage.getItem("token");
  const [theatres, setTheatres] = useState([]);
  const [totalUser, setTotalUser] = useState([]);
  const [totalTicket, setTotalTicket] = useState([]);
  const [totalMovie, setTotalMovie] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [overviewDetails, setOverviewDetails] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const fetchTotalUsers = async () => {
    try {
      await axios.get("http://localhost:7000/user/getalluser")
        .then((res) => {
          setTotalUser(res.data.allUsers);
        })
        .catch((err) => {
          toast.error(err.response?.data?.Error || err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTotalTickets = async (theatreId) => {
    try {
      const response = await axios.get(`http://localhost:7000/payment/getallticketsadmin/?_id=${theatreId}`);
      setTotalTicket(response.data.allTickets);
    } catch (error) {
      toast.error(error.response?.data?.Error || error.message);
    }
  };
  

  const fetchTotalMovies = async () => {
    try {
      await axios.get("http://localhost:7000/movie/user/getallmovie")
        .then((res) => {
          setTotalMovie(res.data.findAllMovies);
        })
        .catch((err) => {
          toast.error(err.response?.data?.Error || err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTheatre = async () => {
    try {
      const response = await axios.get("http://localhost:7000/theatre/get", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const fetchedTheatres = response.data.theatres;
      setTheatres(fetchedTheatres);
      return fetchedTheatres; 
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Request to Login Again");
      }
      toast.error(error.response?.data?.Error || error.message);
      return [];
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTheatres = await fetchTheatre();
  
        if (fetchedTheatres.length > 0) {
          await fetchTotalTickets(fetchedTheatres[0]._id);
        } else {
          console.error("Theatres array is empty");
        }
        await fetchTotalUsers();
        await fetchTotalMovies();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const currentDate = new Date();
    const getMonthYear = (date) => {
      const month = date.getMonth(); 
      const year = date.getFullYear();
      return { month, year };
    };

    const groupTicketsByMonth = totalTicket.reduce((acc, ticket) => {
      const createdAt = new Date(ticket.createdAt);
      const { month, year } = getMonthYear(createdAt);
      const monthKey = `${month}-${year}`;

      if (!acc[monthKey]) {
        acc[monthKey] = { revenue: 0, count: 0 };
      }
      acc[monthKey].revenue += parseFloat(ticket.totalCost || 0);
      acc[monthKey].count += 1;

      return acc;
    }, {});

    const groupUsersByMonth = totalUser.reduce((acc, user) => {
      const createdAt = new Date(user.createdAt);
      const { month, year } = getMonthYear(createdAt);
      const monthKey = `${month}-${year}`;

      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += 1;

      return acc;
    }, {});

    const last5Months = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      return {
        month: date.toLocaleString("default", { month: "short" }),
        year: date.getFullYear(),
        monthKey: `${date.getMonth()}-${date.getFullYear()}`,
      };
    }).reverse();

    const revenueByMonth = last5Months.map(({ month, year, monthKey }) => {
      const monthRevenue = groupTicketsByMonth[monthKey]?.revenue || 0;
      return { month, revenue: monthRevenue };
    });

    const usersByMonth = last5Months.map(({ month, year, monthKey }) => {
      const monthUserCount = groupUsersByMonth[monthKey] || 0;
      return { month, users: monthUserCount };
    });

    const totalRevenue = revenueByMonth.reduce((acc, curr) => acc + curr.revenue, 0);

    const calculateChange = (currentValue, previousValue) => {
      if (previousValue === 0) {
        return "+100%"; 
      }
      const change = ((currentValue - previousValue) / previousValue) * 100;
      return `${change > 0 ? "+" : "-"}${Math.abs(change).toFixed(2)}%`;
    };

    const previousMonthUserCount = groupUsersByMonth[last5Months[1]?.monthKey] || 0;
    const previousMonthRevenue = groupTicketsByMonth[last5Months[1]?.monthKey]?.revenue || 0;

    const updatedOverviewDetails = [
      {
        title: "Total Users",
        value: totalUser.length,
        change: calculateChange(totalUser.length, previousMonthUserCount),
        icon: <FaUsers className="text-4xl text-blue-400" />,
      },
      {
        title: "Tickets Sold",
        value: totalTicket.length,
        change: calculateChange(totalTicket.length, previousMonthUserCount),
        icon: <FaTicketAlt className="text-4xl text-yellow-400" />,
      },
      {
        title: "Revenue",
        value: `RS-${totalRevenue}`,
        change: calculateChange(totalRevenue, previousMonthRevenue),
        icon: <FaMoneyBillAlt className="text-4xl text-green-400" />,
      },
      {
        title: "Movies",
        value: totalMovie.length,
        change: calculateChange(totalMovie.length, 0),
        icon: <FaFilm className="text-4xl text-red-400" />,
      },
    ];

    setOverviewDetails(updatedOverviewDetails);
    setRevenueData(revenueByMonth);
    setUsersData(usersByMonth);

    const timeDifference = (createdAt) => {
      const now = new Date();
      const diff = now - new Date(createdAt);
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (days > 0) return `${days} days ago`;
      if (hours > 0) return `${hours} hours ago`;
      return `${minutes} minutes ago`;
    };
    
    const recentActivities = [];

    if (totalTicket.length > 0) {
      const latestTicket = totalTicket.reduce((prev, current) => (new Date(prev.createdAt) > new Date(current.createdAt) ? prev : current));
      recentActivities.push({
        text: `Ticket purchased by ${latestTicket.userName}`,
        time: timeDifference(latestTicket.createdAt),
      });
    }

    if (totalUser.length > 0) {
      const latestUser = totalUser.reduce((prev, current) => (new Date(prev.createdAt) > new Date(current.createdAt) ? prev : current));
      recentActivities.push({
        text: `New user registered: ${latestUser.userName}`,
        time: timeDifference(latestUser.createdAt),
      });
    }

    if (totalMovie.length > 0) {
      const latestMovie = totalMovie.reduce((prev, current) => (new Date(prev.createdAt) > new Date(current.createdAt) ? prev : current));
      recentActivities.push({
        text: `New movie added: ${latestMovie.title}`,
        time: timeDifference(latestMovie.createdAt),
      });
    }

    setRecentActivity(recentActivities);

  }, [totalUser, totalTicket, totalMovie]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="w-full md:w-56 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
      <div className="p-6 bg-gray-900 w-full min-h-screen">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-200">Dashboard Overview</h1>
          </div>
          <div className="w-full flex items-center flex-wrap justify-center gap-6">
            {overviewDetails.map((value, index) => (
              <div
                key={index}
                className="h-[200px] w-[250px] flex items-center justify-center flex-col gap-3 bg-gray-800 shadow-md hover:scale-105 hover:shadow-lg duration-150 rounded-lg cursor-pointer"
              >
                <div className="mb-3">{value.icon}</div>
                <h3 className="text-gray-400 text-sm font-medium">{value.title}</h3>
                <p className="text-2xl font-bold text-gray-100">{value.value}</p>
                <p
                  className={`text-sm font-medium ${
                    value.change.startsWith("+") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {value.change} since last month
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-gray-800 w-full h-[500px] max-sm:h-[350px] pb-16 shadow-lg rounded-lg p-6 max-sm:px-1">
              <h2 className="text-lg font-bold text-gray-300 mb-4">Monthly Revenue</h2>
              <ResponsiveContainer>
                <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="month" tick={{ fill: "#9ca3af" }} />
                  <YAxis tick={{ fill: "#9ca3af" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#374151", color: "#e5e7eb" }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#f59e0b" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 w-full h-[500px] max-sm:h-[350px] shadow-lg rounded-lg p-6 max-sm:pb-16 pb-16 max-sm:p-2">
              <h2 className="text-lg font-bold text-gray-300 mb-4">Monthly Users</h2>
              <ResponsiveContainer>
                <BarChart data={usersData} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="month" tick={{ fill: "#9ca3af" }} />
                  <YAxis tick={{ fill: "#9ca3af" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#374151", color: "#e5e7eb" }} />
                  <Legend />
                  <Bar dataKey="users" fill="#fb923c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              {recentActivity.map((activity, index) => (
                <li key={index} className="bg-gray-800 shadow-md p-4 rounded-lg hover:bg-gray-700 hover:shadow-lg duration-150">
                  <p className="text-gray-200 font-medium">{activity.text}</p>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
