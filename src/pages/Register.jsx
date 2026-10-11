import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { login, register } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register: setRegistered } = useAuth();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(form);
      const response = await login({ email: form.email, password: form.password });
      setRegistered(response.data.user);
      navigate('/dashboard');
    } catch (err) {
      const payload = err.response?.data;
      if (payload && typeof payload === 'object') {
        setError(Object.values(payload)[0] || 'Registration failed');
      } else {
        setError(err.response?.data?.message || 'Registration failed. If your account was created, please log in.');
      }
    }
  };

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        <p>Start planning your next trip with friends and family.</p>
        <ErrorMessage message={error} />
        <label>Full name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />
        <label>Confirm password</label>
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
        <button className="primary-button" type="submit">Register</button>
        <p className="switch-link">Already registered? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
};

export default Register;
