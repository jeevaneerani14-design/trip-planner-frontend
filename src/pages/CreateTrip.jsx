import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { createTrip } from '../services/tripService';

const initialState = {
  name: '',
  destination: '',
  startDate: '',
  endDate: '',
  description: '',
};

const CreateTrip = () => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createTrip(form);
      navigate(`/trip/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create trip');
    }
  };

  return (
    <div className="page-shell">
      <div className="container narrow-card">
        <h1>Create a new trip</h1>
        <p>We'll add a destination-based day-by-day itinerary that you can edit after creating your trip.</p>
        <ErrorMessage message={error} />
        <form className="stack-form" onSubmit={handleSubmit}>
          <label>Trip name<input name="name" value={form.name} onChange={handleChange} required /></label>
          <label>Destination<input name="destination" value={form.destination} onChange={handleChange} required /></label>
          <div className="two-col-form">
            <label>Start date<input type="date" name="startDate" value={form.startDate} onChange={handleChange} required /></label>
            <label>End date<input type="date" name="endDate" value={form.endDate} onChange={handleChange} required /></label>
          </div>
          <label>Description<textarea name="description" value={form.description} onChange={handleChange} rows="4" /></label>
          <button className="primary-button" type="submit">Create trip</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
