import { Link } from 'react-router-dom';

const featureList = [
  { title: 'Trip planning', text: 'Create trips, manage destinations, and keep every itinerary organized.' },
  { title: 'Smart expenses', text: 'Track expenses, set payers, assign participants, and split totals fairly.' },
  { title: 'Settlements', text: 'See who should pay whom and clear balances with confidence.' },
];

const Landing = () => (
  <div>
    <section className="hero-section">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Plan together. Settle fairly.</span>
          <h1>Trip Planner & Smart Expense Splitter</h1>
          <p className="lead">Keep travel plans, shared spending, and final repayments in one polished dashboard for every trip.</p>
          <div className="button-row">
            <Link className="primary-button" to="/register">Get started</Link>
            <Link className="secondary-button" to="/login">Log in</Link>
          </div>
        </div>
        <div className="hero-card">
          <h3>Trip snapshot</h3>
          <div className="mini-stats">
            <div><strong>12</strong><span>Trips</span></div>
            <div><strong>₹28.4k</strong><span>Spent</span></div>
            <div><strong>4</strong><span>Members</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className="container feature-section">
      <div className="section-heading">
        <span className="eyebrow">Why travelers use it</span>
        <h2>Everything for a smooth trip</h2>
      </div>
      <div className="feature-grid">
        {featureList.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="container process-section">
      <div className="section-heading">
        <span className="eyebrow">How it works</span>
        <h2>From planning to final settlement</h2>
      </div>
      <div className="steps-grid">
        <div className="step-card"><span>1</span><p>Create your trip and invite members.</p></div>
        <div className="step-card"><span>2</span><p>Build a day-wise itinerary and add expenses.</p></div>
        <div className="step-card"><span>3</span><p>Review balances and settle exactly who pays whom.</p></div>
      </div>
    </section>
  </div>
);

export default Landing;
