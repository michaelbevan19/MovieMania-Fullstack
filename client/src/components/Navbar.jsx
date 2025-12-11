import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaCommentDots, FaFilm } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500 flex items-center gap-2">
          <FaFilm /> MovieMania
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-1 hover:text-red-400 transition"><FaHome /> Home</Link>
          <Link to="/add" className="flex items-center gap-1 hover:text-red-400 transition"><FaPlus /> Add Movie</Link>
          <Link to="/feedback" className="flex items-center gap-1 hover:text-red-400 transition"><FaCommentDots /> Reviews</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;