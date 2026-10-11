import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/dateUtils';

const ExpenseCard = ({ expense }) => (
  <div className="expense-card">
    <div className="expense-topline">
      <h4>{expense.title}</h4>
      <span className="amount-pill">{formatCurrency(expense.amount)}</span>
    </div>
    <div className="expense-meta-row">
      <span>{expense.category}</span>
      <span>{formatDate(expense.expenseDate)}</span>
      <span>Payer: {expense.paidByUserName}</span>
    </div>
  </div>
);

export default ExpenseCard;
