import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import Feedback from './pages/Feedback';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;