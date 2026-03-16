import React, { useState, useEffect } from 'react';
import API from '../api';
import GameList from '../components/GameList';
import GameForm from '../components/GameForm';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const res = await API.get('/games');
      setGames(res.data);
    } catch (err) {
      alert('Не удалось загрузить игры');
    }
  };

  const handleAdd = async (game) => {
    try {
      await API.post('/games', game);
      loadGames();
    } catch (err) {
      alert('Не удалось добавить игру');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/games/${id}`);
      setGames(games.filter((g) => g._id !== id));
    } catch (err) {
      alert('Не удалось удалить');
    }
  };

  const handleEdit = async (id, updates) => {
    try {
      await API.put(`/games/${id}`, updates);
      loadGames();
    } catch (err) {
      alert('Не удалось обновить');
    }
  };

  return (
    <div className="page container">
      <div className="dashboard fade-in">
        <header className="dashboard__header">
          <div>
            <h2 className="card__title">Ваша библиотека игр</h2>
            <p className="card__subtitle">
              Добавляйте свои любимые игры, отмечайте статус и оценивайте по своему вкусу.
            </p>
          </div>
        </header>

        <div className="dashboard__grid">
          <div className="card">
            <GameForm onAdd={handleAdd} />
          </div>

          <div className="card">
            <GameList games={games} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
