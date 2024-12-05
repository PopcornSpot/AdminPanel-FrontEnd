import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  firstClassTicketPrice: "",
  secondClassTicketPrice:"",
  poster: null,
  format: "",
  screenNo: "", 
}



const AddMovieForm = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit =async (e) => {
    const authToken=localStorage.getItem("token");
    console.log(authToken); 
    e.preventDefault();
    console.log("Form submitted:", formData);


    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    try {
        console.log("tryyyy");
        
        await axios
          .post("http://localhost:7000/movie/movie", uploadData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((res) => {
           
            console.log(res.data);
            toast.success(res.data.Message);
            setFormData(initialState);
            navigate("/");
          
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.Message);
          });
      } catch (error) {
        console.log(error);
      }
  



  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-500 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Movie</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter movie title"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
          <label className="block font-medium text-gray-700">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter language"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 2h 30m"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Certificate</label>
          <select
            name="certificate"
            value={formData.certificate}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Certificate</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Synopsis</label>
          <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter movie synopsis"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Hero</label>
          <input
            type="text"
            name="hero"
            value={formData.hero}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter hero name"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Director</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter director's name"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Heroine</label>
          <input
            type="text"
            name="heroine"
            value={formData.heroine}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter heroine name"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Music Director</label>
          <input
            type="text"
            name="music"
            value={formData.music}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter music director name"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Trailer URL</label>
          <input
            type="url"
            name="trailerUrl"
            value={formData.trailerUrl}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter trailer URL"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Screen Number</label>
          <select
            name="screenNo"
            value={formData.screenNo}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Screen</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Ticket Price</label>
          <input
            type="number"
            name="firstClassTicketPrice"
            value={formData.firstClassTicketPrice}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter 1st class ticket price"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Ticket Price</label>
          <input
            type="number"
            name="secondClassTicketPrice"
            value={formData.secondClassTicketPrice}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter 2nd class ticket price"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Poster</label>
          <input
            type="file"
            name="poster"
            onChange={handleChange}
            className="w-full mt-1"
            accept="image/*"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Format Types</label>
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
