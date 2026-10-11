import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { addMember, getMembers, removeMember } from '../services/tripService';

const Members = () => {
  const { tripId } = useParams();
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadMembers = async () => {
    try {
      const response = await getMembers(tripId);
      setMembers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMembers(); }, [tripId]);

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      await addMember(tripId, { email });
      setEmail('');
      loadMembers();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add member');
    }
  };

  const handleRemove = async (memberId) => {
    try {
      await removeMember(tripId, memberId);
      loadMembers();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to remove member');
    }
  };

  if (loading) return <Loading message="Loading trip members..." />;

  return (
    <div className="page-shell container">
      <div className="panel">
        <h1>Trip members</h1>
        <ErrorMessage message={error} />
        <form className="inline-form" onSubmit={handleAdd}>
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Add a member by email" />
          <button className="primary-button" type="submit">Add member</button>
        </form>
        <div className="card-stack">
          {members.map((member) => (
            <div className="member-row" key={member.id}>
              <div>
                <strong>{member.userName}</strong>
                <small>{member.email}</small>
              </div>
              <button className="danger-button" type="button" onClick={() => handleRemove(member.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
