import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { getAllExpenses, getExpenses } from '../services/expenseService';
import { formatCurrency } from '../utils/currency';

const Expenses = () => {
  const { tripId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = tripId ? await getExpenses(tripId) : await getAllExpenses();
        setExpenses(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load expenses.');
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [tripId]);

  if (loading) return <Loading message="Loading expenses..." />;

  return (
    <div className="page-shell container">
      <div className="panel">
        <div className="panel-header">
          <h1>{tripId ? 'Expenses' : 'All expenses'}</h1>
          {tripId && <Link className="primary-button" to={`/trip/${tripId}/expenses/new`}>Add expense</Link>}
        </div>
        <ErrorMessage message={error} />
        <div className="card-stack">
          {expenses.length ? expenses.map((expense) => (
            <div className="expense-row" key={expense.id}>
              <div>
                <strong>{expense.title}</strong>
                <small>{expense.category} • {expense.paidByUserName}{expense.tripName ? ` • ${expense.tripName}` : ''} • {expense.expenseDate}</small>
              </div>
              <div>
                <strong>{formatCurrency(expense.amount)}</strong>
              </div>
            </div>
          )) : <p>No expenses yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
