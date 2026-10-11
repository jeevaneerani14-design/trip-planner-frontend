import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/dateUtils';

const TripCard = ({ trip, totalSpend = 0 }) => (
  <Link to={`/trip/${trip.id}`} className="trip-card">
    <div className="trip-card-header">
      <div>
        <span className="badge">Trip</span>
        <h3>{trip.name}</h3>
      </div>
      <span className="trip-meta">{trip.destination}</span>
    </div>
    <p>{trip.description || 'No description yet.'}</p>
    <div className="trip-detail-grid">
      <div>
        <label>Dates</label>
        <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
      </div>
      <div>
        <label>Spend</label>
        <span>{formatCurrency(totalSpend)}</span>
      </div>
    </div>
  </Link>
);

export default TripCard;
