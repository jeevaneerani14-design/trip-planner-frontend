import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import TripCard from '../components/TripCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { getTrips } from '../services/tripService';
import { formatCurrency } from '../utils/currency';

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [summaryResponse, tripResponse] = await Promise.all([
          api.get('/dashboard/summary'),
          getTrips(),
        ]);
        setSummary(summaryResponse.data);
        setTrips(tripResponse.data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="page-shell">
      <div className="container dashboard-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Welcome, {user?.name || 'traveler'}!</h1>
        </div>
        <Link className="primary-button" to="/trips/new">Create trip</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <label>Total trips</label>
          <strong>{summary?.tripCount || trips.length}</strong>
        </div>
        <div className="stat-card">
          <label>Upcoming trips</label>
          <strong>{summary?.upcomingTripCount || 0}</strong>
        </div>
        <div className="stat-card">
          <label>Total spend</label>
          <strong>{formatCurrency(summary?.totalExpenditure || 0)}</strong>
        </div>
      </div>

      <div className="content-grid two-col">
        <section className="panel">
          <div className="panel-header">
            <h2>Your trips</h2>
            <Link to="/trips/new">New trip</Link>
          </div>
          <div className="card-stack">
            {trips.length ? trips.map((trip) => <TripCard key={trip.id} trip={trip} totalSpend={0} />) : <p>No trips yet.</p>}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Recent expenses</h2>
            <Link to="/expenses">View all</Link>
          </div>
          <div className="card-stack">
            {summary?.recentExpenses?.length ? summary.recentExpenses.map((expense) => (
              <div className="mini-expense" key={expense.id}>
                <div>
                  <strong>{expense.title}</strong>
                  <span>{expense.paidByUserName}</span>
                </div>
                <strong>{formatCurrency(expense.amount)}</strong>
              </div>
            )) : <p>No recent expenses.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
