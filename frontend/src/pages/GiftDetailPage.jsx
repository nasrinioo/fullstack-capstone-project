import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const apiBase = import.meta.env.VITE_API_BASE || '';

export default function GiftDetailPage() {
  const { id } = useParams();
  const [gift, setGift] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/gifts/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setGift)
      .catch(() => setError('Could not load this gift.'));
  }, [id]);

  if (error) return <p className="msg error">{error}</p>;
  if (!gift) return <p>Loading…</p>;

  return (
    <div className="card">
      <h1>{gift.productName}</h1>
      <p style={{ color: '#64748b' }}>{gift.category}</p>
      <p>{gift.description}</p>
    </div>
  );
}
