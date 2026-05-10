import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.js';
import LoginPage from './pages/LoginPage.js';
import GiftDetailPage from './pages/GiftDetailPage.jsx';

export default function App() {
  return (
    <div className="layout">
      <nav>
        <strong>GiftLink</strong>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gifts/:id" element={<GiftDetailPage />} />
      </Routes>
    </div>
  );
}
