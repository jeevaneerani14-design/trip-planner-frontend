const Loading = ({ message = 'Loading...' }) => (
  <div className="loading-box">
    <div className="spinner" />
    <p>{message}</p>
  </div>
);

export default Loading;
