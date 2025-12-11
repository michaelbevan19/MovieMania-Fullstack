import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    description: '',
    poster_url: '',
    rating: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // 👇 UPDATED LINK HERE
      await axios.post('https://moviemania-fullstack-production.up.railway.app/movies', movie);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Movie</h1>
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Title" name="title" onChange={handleChange} className="p-3 rounded text-black" />
          <input type="text" placeholder="Genre" name="genre" onChange={handleChange} className="p-3 rounded text-black" />
          <textarea placeholder="Description" name="description" onChange={handleChange} className="p-3 rounded text-black" />
          <input type="text" placeholder="Poster URL" name="poster_url" onChange={handleChange} className="p-3 rounded text-black" />
          <input type="number" step="0.1" placeholder="Rating (0-10)" name="rating" onChange={handleChange} className="p-3 rounded text-black" />

          <button onClick={handleClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded mt-4">
            Add Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;