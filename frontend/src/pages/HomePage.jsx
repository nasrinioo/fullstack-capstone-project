import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiBase = import.meta.env.VITE_API_BASE || '';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/gifts`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
        else setError('Unexpected response');
      })
      .catch(() => setError('Failed to load gifts'));
  }, []);

  return (
    <>
      <header className="hero">
        <h1>GiftLink</h1>
        <p>
          Give away unused household items, browse what neighbors are sharing, and connect with
          your community—no money required.
        </p>
        <Link className="btn" to="/register">
          Get Started
        </Link>
      </header>
      <h2>Latest gifts</h2>
      {error && <p className="msg error">{error}</p>}
      {items.map((g) => (
        <div key={g._id} className="card">
          <Link to={`/gifts/${g._id}`}>
            <strong>{g.productName}</strong>
          </Link>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{g.category}</div>
        </div>
      ))}
    </>
  );
}
