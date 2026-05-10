import { useState } from 'react';

const apiBase = import.meta.env.VITE_API_BASE || '';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('');
    setErr('');
    try {
      /** Assignment: POST + Content-Type header */
      const res = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.message || 'Registration failed');
        return;
      }
      setMsg('Registered successfully. You can sign in.');
      if (data.token) localStorage.setItem('token', data.token);
    } catch {
      setErr('Network error');
    }
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
          Create account
        </button>
      </form>
      {err && <p className="msg error">{err}</p>}
      {msg && <p className="msg ok">{msg}</p>}
    </>
  );
}
