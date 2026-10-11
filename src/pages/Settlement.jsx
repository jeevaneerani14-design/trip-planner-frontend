import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { confirmSettlement, getSettlementSuggestions, getSettlements } from '../services/tripService';
import { formatCurrency } from '../utils/currency';

const Settlement = () => {
  const { tripId } = useParams();
  const [settlements, setSettlements] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [settlementsResponse, suggestionsResponse] = await Promise.all([
      getSettlements(tripId),
      getSettlementSuggestions(tripId),
    ]);
    setSettlements(settlementsResponse.data);
    setSuggestions(suggestionsResponse.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [tripId]);

  const handleConfirm = async (settlementId) => {
    await confirmSettlement(tripId, settlementId);
    load();
  };

  if (loading) return <Loading message="Loading settlements..." />;

  return (
    <div className="page-shell container">
      <div className="panel">
        <h1>Settlement suggestions</h1>
        <div className="card-stack">
          {suggestions.length ? suggestions.map((item) => (
            <div className="member-row" key={`${item.fromUserId}-${item.toUserId}-${item.amount}`}>
              <div>
                <strong>{item.fromUserName} pays {item.toUserName}</strong>
                <small>{formatCurrency(item.amount)}</small>
              </div>
              <button type="button" className="primary-button" onClick={() => handleConfirm(item.id || 0)}>Mark as paid</button>
            </div>
          )) : <p>No settlement suggestions available.</p>}
        </div>
      </div>

      <div className="panel">
        <h2>Settlement history</h2>
        <div className="card-stack">
          {settlements.length ? settlements.map((item) => (
            <div className="member-row" key={item.id}>
              <div>
                <strong>{item.fromUserName} → {item.toUserName}</strong>
                <small>{item.status} • {formatCurrency(item.amount)}</small>
              </div>
            </div>
          )) : <p>No recorded settlements yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Settlement;
