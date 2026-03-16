import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { email, password });
      alert('Регистрация успешна, пожалуйста, войдите');
      navigate('/login');
    } catch (err) {
      alert('Регистрация не удалась');
    }
  };

  return (
    <div className="page container">
      <div className="card fade-in" style={{ maxWidth: 480, margin: '0 auto' }}>
        <h2 className="card__title">Регистрация</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
