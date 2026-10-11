import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page-shell container center-text">
    <h1>Page not found</h1>
    <p>The page you requested does not exist.</p>
    <Link className="primary-button" to="/dashboard">Back to dashboard</Link>
  </div>
);

export default NotFound;
