import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { getBalances } from '../services/tripService';
import { formatCurrency } from '../utils/currency';

const Balances = () => {
  const { tripId } = useParams();
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await getBalances(tripId);
      setBalances(response.data);
      setLoading(false);
    };
    load();
  }, [tripId]);

  if (loading) return <Loading message="Loading balances..." />;

  return (
    <div className="page-shell container">
      <div className="panel">
        <h1>Balances</h1>
        <div className="card-stack">
          {balances.map((balance) => (
            <div className="balance-row" key={balance.userId}>
              <div>
                <strong>{balance.userName}</strong>
                <small>Paid {formatCurrency(balance.totalPaid)} • Owed {formatCurrency(balance.totalOwed)}</small>
              </div>
              <div className={Number(balance.netBalance) >= 0 ? 'credit' : 'debt'}>
                {formatCurrency(balance.netBalance)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Balances;
