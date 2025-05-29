import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarComponent from "../Components/SidebarComponent";

const initialState={
  title: "",
  genre: "",
  language: "",
  duration: "",
  releaseDate: "",
  certificate: "",
  synopsis: "",
  hero: "",
  heroine: "",
  music: "",
  director: "",
  trailerUrl: "",
  image: null,
  format: "",
  producer: "",
}

const fetchMovieForUpdate = async (_id,setMovie) => {
  try {
    const authToken = localStorage.getItem("token");
    await axios
      .get(`https://popcornspotbackend-production.up.railway.app/movie/getmovieforupdate/?_id=${_id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      )
      .then((res) => {
        toast.error(res.data.Error)
        setMovie(res.data.movie);
      })
      .catch((err) => {
        toast.error(err.response.data.Message)
      });
  } catch (error) {
    console.log(error.message);
  }
};



const AddMovieForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [movieEdit, setMovieEdit] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
      ...(type === "file" && { fileOriginalName: files[0]?.name || "" }),
    }));
  };



  const handleSubmit = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();

    let uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });


    try {
      movieEdit ?
        await axios.put(`https://popcornspotbackend-production.up.railway.app/movie/updatemovie/?_id=${_id}`, uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
          .then((res) => {
            console.log(res.data);
            toast.success(res.data.Message);
            toast.error(res.data.Error)
            setFormData(initialState);
            navigate("/movies")
          })
          .catch ((err) =>{
            if (err.response?.status === 401) {
              navigate("/")
              return;
            }
            console.log(err.message); 
          }) :
        await axios
          .post("https://popcornspotbackend-production.up.railway.app/movie/add", uploadData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            toast.success(res.data.Message);
            toast.error(res.data.Error)
            setFormData(initialState);
            navigate("/movies");
          })
          .catch ((err) =>{
            if (err.response?.status === 401) {
              navigate("/")
              return;
            }
            console.log(err.message); 
          });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (_id) {
      setMovieEdit(true);
      fetchMovieForUpdate(_id, setFormData)
    }
    else {
      setMovieEdit(false);
    }
  }, [_id])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-800">
      <div className="w-56 fixed h-20 z-50">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 bg-gray-700 rounded-md shadow-md mt-10 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">
            {movieEdit ? "Update Movie" : "Add Movie"}
          </h2>
          <form onSubmit={handleSubmit} className="grid  grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="text" className="block font-medium text-gray-200">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter movie title"
                required
              />
            </div>

            <div>
              <label htmlFor="genre" className="block font-medium text-gray-200">Genre</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block font-medium text-gray-200">Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter language"
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="block font-medium text-gray-200">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., 2h 30m"
                required
              />
            </div>

            <div>
              <label htmlFor="releaseDate" className="block font-medium text-gray-200">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="certificate" className="block font-medium text-gray-200">Certificate</label>
              <select
                name="certificate"
                value={formData.certificate}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select Certificate</option>
                <option value="U">U</option>
                <option value="UA">UA</option>
                <option value="A">A</option>
                <option value="S">S</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="synopsis" className="block font-medium text-gray-200">Synopsis</label>
              <textarea
                name="synopsis"
                value={formData.synopsis}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter movie synopsis"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="hero" className="block font-medium text-gray-200">Hero</label>
              <input
                type="text"
                name="hero"
                value={formData.hero}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter hero name"
                required
              />
            </div>

            <div>
              <label htmlFor="director" className="block font-medium text-gray-200">Director</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter director's name"
                required
              />
            </div>

            <div>
              <label htmlFor="heroine" className="block font-medium text-gray-200">Heroine</label>
              <input
                type="text"
                name="heroine"
                value={formData.heroine}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter heroine name"
                required
              />
            </div>

            <div>
              <label htmlFor="music" className="block font-medium text-gray-200">Music Director</label>
              <input
                type="text"
                name="music"
                value={formData.music}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter music director name"
                required
              />
            </div>

            <div>
              <label htmlFor="trailerUrl" className="block font-medium text-gray-200">Trailer URL</label>
              <input
                type="url"
                name="trailerUrl"
                value={formData.trailerUrl}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter trailer URL"
                required
              />
            </div>

           <div>
              <label htmlFor="producer" className="block font-medium text-gray-200">Producer Name</label>
              <input
                type="text"
                name="producer"
                value={formData.producer}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter producer name"
              />
            </div>

            <div>
              <label htmlFor="image" className="block font-medium text-gray-200">Poster</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full mt-1"
                accept="image/*"
              />
              {formData.fileOriginalName && <p className="text-lg mt-4 ">
                {formData.fileOriginalName}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-200">Format Types</label>
              <select
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select Format</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="IMAX">IMAX</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-400 text-white font-bold rounded-md hover:bg-orange-500"
              >
                {movieEdit ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;
