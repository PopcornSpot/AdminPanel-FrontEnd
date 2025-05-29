import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarComponent from '../Components/SidebarComponent';

const initialState = {
  movie: '',
  showDate: '',
  showTime: [],
  lastDate: '',
  screen: '',
  firstClassPrice: '',
  secondClassPrice: '',
}



const fetchShowForUpdate = async (_id, setMovie) => {
  try {
    const authToken = localStorage.getItem("token");
    await axios
      .get(`https://popcornspotbackend-production.up.railway.app/show/getsingleshow/?_id=${_id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      )
      .then((res) => {
        toast.success(res.data.Message);
        toast.error(res.data.Error);
        setMovie(res.data.getsingleShow);
        // console.log(res.data.getsingleShow);

      })
      .catch((err) => {
        toast.error(err.response.data.Message);
      });
  } catch (error) {
    console.log(error.message);
  }
};





const AddShow = () => {
  const [editShow, setEditShow] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [movieList, setMovieList] = useState([]);
  const [screenList, setScreenList] = useState([]);
  const authToken = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAllMovies = async () => {
    try {
      await axios
        .get(`https://popcornspotbackend-production.up.railway.app/movie/user/getallmovie`,
        )
        .then((res) => {
          toast.error(res.data.Error);
          const allMovies = res.data.findAllMovies
          const filteredMovies = allMovies.filter((movies) => movies.status == "Published");
          const movies = filteredMovies.map((movieItem) => movieItem.title);
          setMovieList(movies)
        })
        .catch ((err) =>{
          if (err.response?.status === 401) {
            navigate("/")
            return;
          }
          console.log(err.message); 
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllScreens = async () => {
    try {
      await axios
        .get(`https://popcornspotbackend-production.up.railway.app/screen/getallscreen`,
          {
            headers: { Authorization: `Bearer ${authToken}` }
          }
        )
        .then((res) => {
          toast.error(res.data.Error);
          const allScreen = res.data.allScreens
          const Screens = allScreen.map((item) => item.screenNo);
          setScreenList(Screens)
        })
        .catch ((err) =>{
          if (err.response?.status === 401) {
            navigate("/")
            return;
          }
          console.log(err.message); 
        });
    } catch (error) {
      console.log(error.message);
    }
  };



  const handleSubmit = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();

    try {
      editShow
        ? await axios.put(`https://popcornspotbackend-production.up.railway.app/show/update/?_id=${_id}`, formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setFormData(initialState);
            navigate("/show");
          })
          .catch((err) => {
            toast.error(err.response.data.Message);
          })
        : await axios
          .post("https://popcornspotbackend-production.up.railway.app/show/create", formData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setFormData(initialState);
            navigate("/show");
          })
          .catch((err) => {
            toast.error(err.response.data.Message);
          });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (_id) {
      setEditShow(true);
      getAllMovies();
      getAllScreens();
      fetchShowForUpdate(_id, setFormData);
    } else {
      setEditShow(false);
      getAllMovies();
      getAllScreens();
    }
  }, [_id]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-800">
      <div className="w-56 fixed h-20 z-50">
        <SidebarComponent />
      </div>
      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6 bg-gray-700 shadow-md rounded-lg mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{editShow ? 'Update Show' : 'Add New Show'}</h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="movie" className="block text-sm font-medium text-gray-200">
                Movie Selection
              </label>
              <select
                id="movie"
                name="movie"
                value={formData.movie}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select a Movie</option>
                {movieList.map((movie, index) => (
                  <option key={index} value={movie}>
                    {movie}
                  </option>
                ))}
              </select>
            </div>


            <div className="mb-4">
              <label htmlFor="showDate" className="block text-sm font-medium text-gray-200">
                Show Date
              </label>
              <input
                type="date"
                id="showDate"
                name="showDate"
                value={formData.showDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>


            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-200">
                Show Time Selection
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"].map((time, index) => (
                  <label key={index} className="flex items-center space-x-2 text-gray-400">
                    <input
                      type="checkbox"
                      value={time}
                      checked={formData.showTime.includes(time)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setFormData((prevData) => ({
                          ...prevData,
                          showTime: checked
                            ? [...prevData.showTime, value]
                            : prevData.showTime.filter((t) => t !== value),
                        }));
                      }}
                      className="form-checkbox h-4 w-4 text-orange-500"
                    />
                    <span className="text-sm">{time}</span>
                  </label>
                ))}
              </div>
            </div>



            <div className="mb-4">
              <label htmlFor="screen" className="block text-sm font-medium text-gray-200">
                Screen Selection
              </label>
              <select
                id="screen"
                name="screen"
                value={formData.screen}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              >
                <option value="">Select a Screen</option>
                {screenList.map((screen, index) => (
                  <option key={index} value={screen}>
                    {screen}
                  </option>
                ))}
              </select>
            </div>


            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstClassPrice" className="block text-sm font-medium text-gray-200">
                  First Class Price
                </label>
                <input
                  type="number"
                  id="firstClassPrice"
                  name="firstClassPrice"
                  value={formData.firstClassPrice}
                  onChange={handleChange}
                  className="mt-1 block no-spinner w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="secondClassPrice" className="block text-sm font-medium text-gray-200">
                  Second Class Price
                </label>
                <input
                  type="number"
                  id="secondClassPrice"
                  name="secondClassPrice"
                  value={formData.secondClassPrice}
                  onChange={handleChange}
                  className="mt-1 block no-spinner w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="lastDate" className="block text-sm font-medium text-gray-200">
                Show Last Date
              </label>
              <input
                type="date"
                id="lastDate"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>


            <div className="w-full  flex justify-center items-center mt-6">
              <button
                type="submit"
                className="w-1/2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {editShow ? 'Update Show' : 'Add Show'}
              </button>
            </div>
          </form>
        </div>
      </div> </div>
  );
};

export default AddShow;
