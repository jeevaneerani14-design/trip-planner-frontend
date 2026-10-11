import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { getMembers } from '../services/tripService';
import { createExpense } from '../services/expenseService';

const initialForm = {
  title: '',
  amount: '',
  category: 'Food',
  description: '',
  expenseDate: '',
  paidByUserId: '',
  splitType: 'EQUAL',
  participantIds: [],
};

const AddExpense = () => {
  const { tripId } = useParams();
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const response = await getMembers(tripId);
      setMembers(response.data);
      if (response.data[0]) {
        setForm((prev) => ({ ...prev, paidByUserId: response.data[0].userId || '' }));
      }
    };
    load();
  }, [tripId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleParticipantToggle = (userId) => {
    setForm((prev) => {
      const selected = prev.participantIds.includes(userId)
        ? prev.participantIds.filter((id) => id !== userId)
        : [...prev.participantIds, userId];
      return { ...prev, participantIds: selected };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createExpense(tripId, {
        ...form,
        amount: Number(form.amount),
        paidByUserId: Number(form.paidByUserId),
        participantIds: form.participantIds.map((id) => Number(id)),
      });
      navigate(`/trip/${tripId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save expense');
    }
  };

  return (
    <div className="page-shell container">
      <div className="panel narrow-card">
        <h1>Add expense</h1>
        <ErrorMessage message={error} />
        <form className="stack-form" onSubmit={handleSubmit}>
          <label>Title<input name="title" value={form.title} onChange={handleChange} required /></label>
          <div className="two-col-form">
            <label>Amount<input type="number" step="0.01" name="amount" value={form.amount} onChange={handleChange} required /></label>
            <label>Category<select name="category" value={form.category} onChange={handleChange}>
              <option>Accommodation</option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Tickets and activities</option>
              <option>Shopping</option>
              <option>Fuel</option>
              <option>Other</option>
            </select></label>
          </div>
          <div className="two-col-form">
            <label>Date<input type="date" name="expenseDate" value={form.expenseDate} onChange={handleChange} required /></label>
            <label>Payer<select name="paidByUserId" value={form.paidByUserId} onChange={handleChange}>
              {members.map((member) => (
                <option key={member.userId} value={member.userId}>{member.userName}</option>
              ))}
            </select></label>
          </div>
          <label>Split type<select name="splitType" value={form.splitType} onChange={handleChange}>
            <option value="EQUAL">Equal split</option>
            <option value="CUSTOM">Custom split</option>
            <option value="SELECTIVE">Selective split</option>
          </select></label>
          <label>Description<textarea rows="3" name="description" value={form.description} onChange={handleChange} /></label>

          <div className="participant-box">
            <h3>Participants</h3>
            {members.map((member) => (
              <label key={member.userId} className="checkbox-row">
                <input type="checkbox" checked={form.participantIds.includes(member.userId)} onChange={() => handleParticipantToggle(member.userId)} />
                {member.userName}
              </label>
            ))}
          </div>

          <button className="primary-button" type="submit">Save expense</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
