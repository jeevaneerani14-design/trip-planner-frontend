import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getTrip, getMembers, getItinerary, getBalances, getSettlements } from '../services/tripService';
import { getExpenses } from '../services/expenseService';
import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/dateUtils';

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [balances, setBalances] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [tripResponse, membersResponse, itineraryResponse, expenseResponse, balancesResponse, settlementsResponse] = await Promise.all([
          getTrip(tripId),
          getMembers(tripId),
          getItinerary(tripId),
          getExpenses(tripId),
          getBalances(tripId),
          getSettlements(tripId),
        ]);
        setTrip(tripResponse.data);
        setMembers(membersResponse.data);
        setItinerary(itineraryResponse.data);
        setExpenses(expenseResponse.data);
        setBalances(balancesResponse.data);
        setSettlements(settlementsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load trip details.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tripId]);

  if (loading) return <Loading message="Loading trip details..." />;
  if (!trip) return <div className="page-shell container"><ErrorMessage message={error || 'Trip not found.'} /></div>;

  const totalSpent = expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0);

  return (
    <div className="page-shell container">
      <div className="panel trip-header-panel">
        <div>
          <span className="eyebrow">Trip overview</span>
          <h1>{trip.name}</h1>
          <p>{trip.destination} • {formatDate(trip.startDate)} to {formatDate(trip.endDate)}</p>
        </div>
        <div className="trip-actions">
          <Link className="secondary-button" to={`/trip/${tripId}/members`}>Members</Link>
          <Link className="secondary-button" to={`/trip/${tripId}/itinerary`}>Itinerary</Link>
          <Link className="secondary-button" to={`/trip/${tripId}/expenses`}>Expenses</Link>
          <Link className="secondary-button" to={`/trip/${tripId}/balances`}>Balances</Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><label>Members</label><strong>{members.length}</strong></div>
        <div className="stat-card"><label>Expenses</label><strong>{expenses.length}</strong></div>
        <div className="stat-card"><label>Spend</label><strong>{formatCurrency(totalSpent)}</strong></div>
      </div>

      <div className="content-grid two-col">
        <section className="panel">
          <h2>Trip summary</h2>
          <p>{trip.description || 'No trip description yet.'}</p>
          <ul className="summary-list">
            <li>Created by: {trip.createdByName}</li>
            <li>Members: {members.map((member) => member.userName).join(', ') || 'No members added yet.'}</li>
            <li>Itinerary items: {itinerary.length}</li>
          </ul>
        </section>

        <section className="panel">
          <h2>Balances</h2>
          {balances.length ? balances.map((entry) => (
            <div className="mini-expense" key={entry.userId}>
              <div><strong>{entry.userName}</strong><span>Net</span></div>
              <strong>{formatCurrency(entry.netBalance)}</strong>
            </div>
          )) : <p>No balances yet.</p>}
        </section>
      </div>
    </div>
  );
};

export default TripDetails;
