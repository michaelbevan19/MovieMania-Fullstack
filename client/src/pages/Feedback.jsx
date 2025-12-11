import { useState, useEffect } from 'react';

const Feedback = () => {
  const [location, setLocation] = useState('Locating...');
  const [formData, setFormData] = useState({ name: '', email: '', movie: '', rating: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(2)}, Lng: ${position.coords.longitude.toFixed(2)}`);
        },
        () => setLocation('Location permission denied')
      );
    }
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email.includes('@')) tempErrors.email = "Invalid email";
    if (!formData.rating || isNaN(formData.rating) || formData.rating < 1 || formData.rating > 10) tempErrors.rating = "Rating must be 1-10";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Feedback Submitted:", formData);
      alert("Feedback submitted! Check console.");
      setFormData({ name: '', email: '', movie: '', rating: '' });
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Movie Feedback</h2>
        <p className="text-sm text-yellow-400 mb-6">📍 User Location: {location}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="p-2 rounded text-black" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}

          <input className="p-2 rounded text-black" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}

          <input className="p-2 rounded text-black" placeholder="Movie Title" value={formData.movie} onChange={e => setFormData({...formData, movie: e.target.value})} />

          <input className="p-2 rounded text-black" placeholder="Rating (1-10)" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} />
          {errors.rating && <span className="text-red-500 text-xs">{errors.rating}</span>}

          <button type="submit" className="bg-blue-600 py-2 rounded font-bold hover:bg-blue-700">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;