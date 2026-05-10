import { useState } from 'react';

const apiBase = import.meta.env.VITE_API_BASE || '';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('');
    setErr('');
    const existing = localStorage.getItem('token');
    /** Assignment: Content-Type + Authorization headers */
    const headers = {
      'Content-Type': 'application/json',
      Authorization: existing ? `Bearer ${existing}` : 'Bearer ',
    };
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.message || 'Login failed');
        return;
      }
      if (data.token) localStorage.setItem('token', data.token);
      setMsg('Signed in. JWT stored locally.');
    } catch {
      setErr('Network error');
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Sign in
        </button>
      </form>
      {err && <p className="msg error">{err}</p>}
      {msg && <p className="msg ok">{msg}</p>}
    </>
  );
}
