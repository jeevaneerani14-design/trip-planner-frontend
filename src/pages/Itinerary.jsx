import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { createItineraryItem, deleteItineraryItem, getItinerary, updateItineraryItem } from '../services/tripService';
import { formatCurrency } from '../utils/currency';

const emptyForm = {
  title: '',
  description: '',
  location: '',
  activityDate: '',
  startTime: '',
  endTime: '',
  estimatedCost: '0',
  notes: '',
};

const Itinerary = () => {
  const { tripId } = useParams();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [error, setError] = useState('');

  const loadItems = async () => {
    try {
      const response = await getItinerary(tripId);
      setItems(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load the itinerary.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadItems(); }, [tripId]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const payload = { ...form, estimatedCost: Number(form.estimatedCost || 0) };
      if (editingItemId) {
        await updateItineraryItem(tripId, editingItemId, payload);
      } else {
        await createItineraryItem(tripId, payload);
      }
      setForm(emptyForm);
      setEditingItemId(null);
      await loadItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save the itinerary item.');
    }
  };

  const handleDelete = async (itemId) => {
    setError('');
    try {
      await deleteItineraryItem(tripId, itemId);
      if (editingItemId === itemId) {
        setForm(emptyForm);
        setEditingItemId(null);
      }
      await loadItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete the itinerary item.');
    }
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setForm({
      title: item.title || '',
      description: item.description || '',
      location: item.location || '',
      activityDate: item.activityDate || '',
      startTime: item.startTime?.slice(0, 5) || '',
      endTime: item.endTime?.slice(0, 5) || '',
      estimatedCost: String(item.estimatedCost || 0),
      notes: item.notes || '',
    });
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setForm(emptyForm);
  };

  if (loading) return <Loading message="Loading itinerary..." />;

  return (
    <div className="page-shell container">
      <div className="panel">
        <h1>Itinerary</h1>
        <p>Starter activities are based on your destination and trip dates. Edit, add, or remove items to make the plan your own.</p>
        <ErrorMessage message={error} />
        <form className="stack-form" onSubmit={handleSubmit}>
          <label>Title<input name="title" value={form.title} onChange={handleChange} required /></label>
          <label>Activity details<textarea rows="3" name="description" value={form.description} onChange={handleChange} /></label>
          <label>Location<input name="location" value={form.location} onChange={handleChange} /></label>
          <div className="two-col-form">
            <label>Day<input type="date" name="activityDate" value={form.activityDate} onChange={handleChange} required /></label>
            <label>Estimated cost<input type="number" step="0.01" name="estimatedCost" value={form.estimatedCost} onChange={handleChange} /></label>
          </div>
          <div className="two-col-form">
            <label>Start time<input type="time" name="startTime" value={form.startTime} onChange={handleChange} /></label>
            <label>End time<input type="time" name="endTime" value={form.endTime} onChange={handleChange} /></label>
          </div>
          <label>Notes<textarea rows="3" name="notes" value={form.notes} onChange={handleChange} /></label>
          <div className="trip-actions">
            <button className="primary-button" type="submit">{editingItemId ? 'Save changes' : 'Add itinerary item'}</button>
            {editingItemId && <button className="secondary-button" type="button" onClick={cancelEdit}>Cancel edit</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h2>Planned activities</h2>
        <div className="card-stack">
          {items.length ? items.map((item) => (
            <div className="trip-item" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.location} • {item.activityDate} {item.startTime?.slice(0, 5) || ''}</p>
                {item.description && <p>{item.description}</p>}
                {item.notes && <p>{item.notes}</p>}
              </div>
              <div>
                <span>{formatCurrency(item.estimatedCost || 0)}</span>
                <button className="secondary-button" type="button" onClick={() => handleEdit(item)}>Edit</button>
                <button className="danger-button" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          )) : <p>No itinerary yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
