import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch Movies
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get('https://moviemania-fullstack-production.up.railway.app/movies');
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMovies();
  }, []);

  // Delete Movie
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://moviemania-fullstack-production.up.railway.app/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Filter Logic
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 rounded-xl p-10 mb-8 text-center shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-2">MovieMania: Dive into Cinematic Worlds</h1>
        <p className="text-lg opacity-90">Discover, Review, and Manage your favorite films.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by Title or Genre..."
          className="w-full md:w-1/2 p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card bg-gray-800 rounded-lg overflow-hidden shadow-lg relative group">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-80 object-cover lazy-load"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
              <p className="text-sm text-gray-400 mb-2">{movie.genre} | ⭐ {movie.rating}</p>
              <p className="text-gray-300 text-sm line-clamp-2">{movie.description}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
                {/* Normally we'd link to an Edit page here */}
                <span className="text-xs text-gray-500 self-center">ID: {movie.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;