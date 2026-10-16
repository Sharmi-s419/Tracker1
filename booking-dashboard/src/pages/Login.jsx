import React, { useState } from 'react';
import { Lock, User, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RotatingLogo from '../components/RotatingLogo';

export const Login = ({ onLoginSuccess, onBackToGuest }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      if (err.response?.data?.non_field_errors) {
        setError(err.response.data.non_field_errors[0]);
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Invalid username or password. Please verify credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A1120',
        padding: '1.5rem',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(198, 161, 91, 0.15) 0%, transparent 60%)',
      }}
    >
      {onBackToGuest && (
        <div style={{ width: '100%', maxWidth: '420px', marginBottom: '1rem' }}>
          <button
            onClick={onBackToGuest}
            style={{
              background: 'none',
              border: 'none',
              color: '#DFBE7D',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              padding: '0.5rem 0',
            }}
          >
            <ArrowLeft size={16} /> Back to Guest Booking
          </button>
        </div>
      )}

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          border: '1px solid rgba(198, 161, 91, 0.3)',
        }}
      >
        <div
          style={{
            backgroundColor: '#101C35',
            padding: '2.5rem 2rem 2rem',
            textAlign: 'center',
            borderBottom: '2px solid #C6A15B',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <RotatingLogo size={58} speed={24} theme="gold" idPrefix="login" />
          </div>
          <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.04em' }}>
            HOTEL LARA INTERNATIONAL
          </h2>
          <p style={{ color: '#DFBE7D', fontSize: '0.8rem', marginTop: '0.25rem', letterSpacing: '0.05em' }}>
            Staff Reception & Reservation Console
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Staff Username
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                }}
              />
              <input
                id="username"
                type="text"
                className="form-control"
                style={{ paddingLeft: '2.4rem' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="Enter staff username"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                }}
              />
              <input
                id="password"
                type="password"
                className="form-control"
                style={{ paddingLeft: '2.4rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-gold"
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Front Desk'}
            <ArrowRight size={18} />
          </button>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: '#64748B',
              textAlign: 'center',
              border: '1px dashed #CBD5E1',
            }}
          >
            Hotel Lara International — Internal Staff Portal.
            <br />
            Unauthorized access prohibited.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
